import Projects from '../models/Projects';

const getAll = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const projects = await Projects.find();
    if (!projects) {
      return res.status(404).json({
        message: 'An error occured ',
      });
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Projects founded',
        data: projects,
      });
    }
    let filterByParams;
    if (req.query.name) {
      filterByParams = projects.filter((project) => project.name === req.query.name);
    }
    return res.status(200).json({ filterByParams });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
    });
  }
};
const create = async (req, res) => {
  try {
    const newProject = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.starDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
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
  getAll,
  create,
};
