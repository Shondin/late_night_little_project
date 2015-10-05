from app import app
from flask_admin import Admin
admin = Admin(app, name='microblog', template_mode='bootstrap3')
# Add administrative views here
app.run(debug=True)