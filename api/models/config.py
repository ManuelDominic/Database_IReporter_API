from os import environ


class Config(object):
    """Common configurations"""
    DATABASE_URL = environ.get("DATABASE_URL")
    MAIL_PASSWORD = environ.get("MAIL_PASSWORD")
    MAIL_USERNAME = environ.get("MAIL_USERNAME")
    SECRET_KEY = environ.get("SECRET_KEY")


class DevelopmentConfig(Config):
    """Development configurations"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configurations"""
    DEBUG = False


class TestingConfig(Config):
    """Testing configurations"""
    DEBUG = True


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}
