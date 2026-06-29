class Config:
    SECRET_KEY = "mysecretkey"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///courses.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False