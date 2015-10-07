from app import app
from app.views import MyAdminIndexView, MyModelView
import flask_admin as admin

admin = Admin(app, name='microblog', template_mode='bootstrap3')
# Initialize flask-login
init_login()

# Create admin
admin = admin.Admin(app, 'Example: Auth', index_view=MyAdminIndexView(), base_template='my_master.html')

# Add view
admin.add_view(MyModelView(User, db.session))


# Add administrative views here
app.run(debug=True)