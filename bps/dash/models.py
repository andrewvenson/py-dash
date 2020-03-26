from .. import db

class Data(db.Model):
    
    __tablename__ = 'data'
    id = db.Column(db.Integer,
                   primary_key=True)
    info = db.Column(db.String(64),
                         index=False,
                         unique=True,
                         nullable=False)

    