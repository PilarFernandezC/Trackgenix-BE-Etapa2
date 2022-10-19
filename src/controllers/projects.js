import Projects from '../models/Projects';

// const getAll = async (req, res) => {
//     const queriesArray = Object.keys(req.query);
//     try {
//       const projects = await Projects.find();
//       if (!projects) {
//         return res.status(404).json({
//           message: 'An error occured ',
//         });
//       }
//       if (queriesArray.length === 0) {
//         return res.status(200).json({
//           message: 'Projects founded',
//           data: projects,
//         });
//       }
//       let filterByParams;
//       if (req.query.name) {
//         filterByParams = projects.filter((project) => project.name === req.query.name);
//       }
//       if (req.query.lastName) {
//         filterByParams = projects.filter((project) => project.lastName
//         === req.query.lastName);
//       }
//       if (req.query.email) {
//         filterByParams = projects.filter((project) => project.email === req.query.email);
//       }
//       return res.status(200).json({ filterByParams });
//     } catch (error) {
//       return res.json({
//         message: `An error ocurred: ${error}`,
//       });
//     }
//   };
const create = async (req, res) => {
  try {
    const newProject = new Projects({
      name: req.body.name,
      description: req.body.description,
      starDate: req.body.starDate,
      endDate: req.body.password,
      clientName: req.body.clientName,
      employee: [{
        employeeId: req.body.employeeId,
        role: req.body.role,
        rate: req.body.rate,
      }],
    });
    const confirm = await newProject.save();
    if (!newProject) {
      return res.status(400).json({
        message: 'All the fileds need to be filled',
        data: confirm,
      });
    }
    return res.status(201).json({
      message: 'Super Admins created',
      data: confirm,
    });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      error,
    });
  }
};
export default {
  // getAll,
  create,
};
