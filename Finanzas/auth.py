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


def _load_users() -> list:
    """Carga la lista de usuarios desde el archivo."""
    if not USERS_FILE.exists():
        return []
    try:
        with open(USERS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get("users", [])
    except (json.JSONDecodeError, IOError):
        return []


def _save_users(users: list) -> None:
    """Guarda la lista de usuarios en el archivo."""
    data = {"users": users}
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


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
        for user in self.users:
            if user["username"].lower() == username.lower():
                return False, "Ya existe un usuario con este nombre"

        # Crear nuevo usuario
        new_user = {
            "username": username,
            "password_hash": _hash_password(password),
            "name": name
        }
        self.users.append(new_user)
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
        # Buscar el usuario
        for user in self.users:
            if user["username"].lower() == username.lower():
                if user["password_hash"] == _hash_password(password):
                    # Login exitoso
                    _save_current_session(
                        user["username"],
                        user["password_hash"],
                        user["name"]
                    )
                    self.session = {
                        "username": user["username"],
                        "password_hash": user["password_hash"],
                        "name": user["name"]
                    }
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
