"""added email to distributor and customer user

Revision ID: 4df11a92f9df
Revises: 742b1adeb345
Create Date: 2024-04-25 16:39:51.587982

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4df11a92f9df'
down_revision = '742b1adeb345'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users_customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))

    with op.batch_alter_table('users_distributors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users_distributors', schema=None) as batch_op:
        batch_op.drop_column('email')

    with op.batch_alter_table('users_customers', schema=None) as batch_op:
        batch_op.drop_column('email')

    # ### end Alembic commands ###
