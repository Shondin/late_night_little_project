import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:@localhost/test'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_lsrepository')