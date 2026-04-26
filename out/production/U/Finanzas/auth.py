"""Módulo de autenticación simple con usuario/contraseña."""
import json
import secrets
from pathlib import Path


USERS_FILE = Path(__file__).parent / "users.json"
CURRENT_SESSION_FILE = Path(__file__).parent / ".current_user"


def _hash_password(password: str) -> str:
    """Genera un hash simple de la contraseña."""
    import hashlib
    return hashlib.sha256(password.encode()).hexdigest()


def _verify_password(password: str, stored_hash: str, salt: str | None = None) -> bool:
    """Verifica una contraseña contra un hash almacenado."""
    # Verificar sin salt (compatibilidad con hashes existentes)
    if not salt:
        return _hash_password(password) == stored_hash
    # Verificar con salt
    computed = _hash_password(password)
    expected = _hash_password(f"{password}{salt}")
    return computed == expected


def _load_users() -> dict:
    """Carga los usuarios desde el archivo."""
    if not USERS_FILE.exists():
        return {"users": [], "admin": None}
    try:
        with open(USERS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Si no tiene estructura correcta, crear admin por defecto
            if "admin" not in data or data["admin"] is None:
                import hashlib
                salt = hashlib.sha256("admin_salt_secret".encode()).hexdigest()[:8]
                pwd_hash = hashlib.sha256(f"admin123{salt}".encode()).hexdigest()
                data["admin"] = {
                    "username": "admin",
                    "password_hash": pwd_hash,
                    "name": "Administrador",
                    "salt": salt
                }
            return data
    except (json.JSONDecodeError, IOError):
        return {"users": [], "admin": None}


def _save_users(users_data: dict) -> None:
    """Guarda los usuarios en el archivo."""
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(users_data, f, indent=2, ensure_ascii=False)


def _load_current_session() -> dict | None:
    """Carga el usuario de la sesión actual."""
    if not CURRENT_SESSION_FILE.exists():
        return None
    try:
        with open(CURRENT_SESSION_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return None


def _save_current_session(username: str, password_hash: str, name: str) -> None:
    """Guarda el usuario de la sesión actual."""
    with open(CURRENT_SESSION_FILE, 'w', encoding='utf-8') as f:
        json.dump({"username": username, "password_hash": password_hash, "name": name}, f)


class AuthManager:
    """Administrador de autenticación."""

    def __init__(self):
        """Inicializa el administrador de autenticación."""
        self.users = _load_users()
        self.session = _load_current_session()

    def register_user(self, username: str, password: str, name: str) -> tuple[bool, str]:
        """
        Registra un nuevo usuario.

        Args:
            username: Nombre de usuario
            password: Contraseña
            name: Nombre completo del usuario

        Returns:
            tuple(bool, str): (exitoso, mensaje)
        """
        # Validar longitud de contraseña
        if len(password) < 6:
            return False, "La contraseña debe tener al menos 6 caracteres"

        # Verificar que el usuario no exista
        if username.lower() in self.users["users"]:
            return False, "Ya existe un usuario con este nombre"

        # Crear nuevo usuario
        import hashlib
        salt = hashlib.sha256(f"{username}_salt".encode()).hexdigest()[:8]
        pwd_hash = hashlib.sha256(f"{password}{salt}".encode()).hexdigest()

        new_user = {
            "username": username,
            "password_hash": pwd_hash,
            "name": name,
            "salt": salt
        }
        self.users["users"].append(new_user)
        _save_users(self.users)

        return True, f"Usuario '{username}' registrado correctamente"

    def login(self, username: str, password: str) -> tuple[bool, str, dict | None]:
        """
        Autenticar usuario.

        Args:
            username: Nombre de usuario
            password: Contraseña

        Returns:
            tuple(bool, str, dict | None): (exitoso, mensaje, user_data)
        """
        # Verificar si users es una lista (estructura antigua) o diccionario
        users_list: list = self.users if isinstance(self.users, list) else self.users.get("users", [])

        # Buscar el usuario
        for user in users_list:
            if user["username"].lower() == username.lower():
                if _verify_password(password, user["password_hash"], user.get("salt")):
                    # Login exitoso
                    _save_current_session(
                        user["username"],
                        user["password_hash"],
                        user["name"]
                    )
                    self.session = user.copy()
                    return True, f"¡Bienvenido/a {user['name']}!", self.session

        return False, "Credenciales incorrectas", None

    def logout(self) -> bool:
        """Cerrar sesión actual."""
        if self.session:
            _save_current_session(None, None, None)
            self.session = None
            return True
        return False

    def check_session(self) -> bool:
        """Verificar si hay una sesión activa."""
        return self.session is not None

    def get_current_user(self) -> dict | None:
        """Obtener datos del usuario de la sesión actual."""
        return self.session.copy() if self.session else None

    def get_all_users(self) -> list:
        """Obtener lista de todos los usuarios."""
        return self.users

    def is_authorized(self) -> bool:
        """Verificar si el usuario actual está autorizado."""
        return self.check_session()
