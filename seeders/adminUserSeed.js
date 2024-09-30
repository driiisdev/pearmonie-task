const bcrypt = require('bcrypt');
const { Users, Roles, user_roles, sequelize } = require('../models');

async function seedAdminUser() {
  try {
    await sequelize.transaction(async (t) => {
      // Find or create Admin role
      const [adminRole] = await Roles.findOrCreate({
        where: { name: 'Admin' },
        defaults: { description: 'Administrator role' },
        transaction: t
      });
      console.log(adminRole.isNewRecord ? "Admin role created" : "Admin role found");

      const adminUsername = 'eriiisdev';
      const adminEmail = 'odev@example.com';
      const adminPassword = 'driiis@admin01';

      // Find or create Admin user
      let [adminUser, created] = await Users.findOrCreate({
        where: { username: adminUsername },
        defaults: {
          email: adminEmail,
          password: await bcrypt.hash(adminPassword, 10)
        },
        transaction: t
      });

      if (created) {
        console.log('Admin user created successfully');
      } else {
        console.log('Admin user already exists, updating details');
        adminUser.email = adminEmail;
        adminUser.password = await bcrypt.hash(adminPassword, 10);
        await adminUser.save({ transaction: t });
      }

      // Check if the association already exists
      const existing_association = await user_roles.findOne({
        where: {
          userId: adminUser.id,
          roleId: adminRole.id
        },
        transaction: t
      });

      if (!existing_association) {
        await user_roles.create({
          userId: adminUser.id,
          roleId: adminRole.id
        }, { transaction: t });
        console.log('Admin role assigned to user');
      } else {
        console.log('Admin user already has Admin role');
      }
    });

    console.log('Admin user seed completed');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await sequelize.close();
  }
}

seedAdminUser();
