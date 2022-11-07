import Models from '../models/Task';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Models.find(req.query);

    if (!tasks.length) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Task not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: 'Tasks found.',
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
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Task not found.', status: 404,
      };
    }
    return res.status(200).json({
      msg: 'Task found.',
      data: task,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Models({
      description: req.body.description,
    });
    const result = await task.save();
    if (!task) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create a new task.', status: 404,
      };
    }
    return res.status(201).json({
      message: 'New task successfully created.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
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
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Task not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: `Task with the ID ${req.params.id} has been updated.`,
      data: response,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Models.findByIdAndDelete(id);
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Task not found.', status: 404,
      };
    }
    return res.status(204).json({
      message: `Task with the ID ${req.params.id} has been deleted.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
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
