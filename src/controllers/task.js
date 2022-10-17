import Models from '../models/Task';
// import task from '../validations/task';

export const getAll = async (req, res) => {
  try {
    const tasks = await Models.find();
    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'an error ocurred',
      error: err,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const task = await Models.findById(id);
    if (!task) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error:',
      data: error,
      error: true,
    });
  }
};

// export const createTask = async (req, res) => {
//   try {
//     const task = new tasks({
//       description: req.body.description,
//     });

//     const result = await task.save();
//     return res.status(201).json({
//       message: 'Task created successfully',
//       data: result,
//       error: false,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: 'Task cannot be created',
//       error,
//     });
//   }
// };

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const task = req.body;
    const response = await Models.findByIdAndUpdate(id, {
      description: task.description,
    });
    if (!response) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been Updated',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      data: error,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error:',
      data: error,
      error: true,
    });
  }
};

// export {
//   getTaskById,
//   editTask,
//   deleteTask,
//   };
