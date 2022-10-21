import Models from '../models/Task';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Models.find(req.query);

    if (!tasks.length) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Tasks not found', status: 404,
      };
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Models.findById(id);
    if (!task) {
      return res.status(404).json({
        msg: 'The task has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The task has been found',
      data: task,
    });
  } catch (err) {
    return res.json({
      message: `an error ocurred: ${err}`,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Models({
      description: req.body.description,
    });

    const result = await task.save();
    return res.status(201).json({
      messsage: 'Project created successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error ocurred: ${err}`,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const response = await Models.findByIdAndUpdate(id, {
      description: task.description,
    });
    if (!response) {
      return res.status(404).json({
        msg: 'The task has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The task has been Updated',
    });
  } catch (err) {
    return res.json({
      message: `an error ocurred: ${err}`,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Models.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        msg: 'The task has not been found',
      });
    }
    return res.status(204).json({
      msg: 'The task has been deleted: ',
      data: result,
    });
  } catch (err) {
    return res.json({
      message: `an error ocurred: ${err}`,
    });
  }
};

export default {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getOneTask,
};
