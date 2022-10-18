import Tasks from '../models/Task';

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find()
    } catch (error) {
        return res.json({
            return res.status(400).json({
                message: 'An error occurred: ${error}',
                error: error,
        });
    }
};

const createTask = async (req, res) => {
    try {
        const task = new Tasks({
            description: req.body.description,
        });

        const result = await task.save();
        return res.status(201).json({
            messsage: 'Project created successfully',
            data: result,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred: ${error}',
            error: error,
        });
    }
};

export default {
    getAllTasks,
    createTask,
}
