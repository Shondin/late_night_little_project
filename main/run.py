from app import app, db
import os
import os.path as op
from app.views import MyAdminIndexView, MyModelView, init_login
from app.models import User
import flask_admin as admin
from flask_admin.contrib import fileadmin

# Initialize flask-login
init_login()

path = op.join(op.dirname(__file__), 'files')
try:
    os.mkdir(path)
except OSError:
    pass
# Create admin
admin = admin.Admin(app, 'Example: Auth', index_view=MyAdminIndexView(),template_mode='bootstrap3', base_template='my_master.html')

# Add view
admin.add_view(MyModelView(User, db.session))
admin.add_view(fileadmin.FileAdmin(path, '/files/', name='Files'))
# Add administrative views here
app.run(debug=True)