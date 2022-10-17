import Models from "../models/Task";

export const getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Models.findById(id);
        if (!task) {
            return res.status(404).json({
                msg: "The task has not been found",
            });
        }
        return res.status(200).json({
            msg: "The task has been found",
            data: task,
        });
    } catch (error) {
        return res.json({
            message: `an error ocurred: ${error}`,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        const response = await Models.findByIdAndUpdate(id, {
            description: task.description,
        });
        if (!response) {
            return res.status(404).json({
                msg: "The task has not been found",
            });
        }
        return res.status(200).json({
            msg: "The task has been Updated",
        });
    } catch (error) {
        return res.json({
            message: `an error ocurred: ${error}`,
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Models.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({
                msg: "The task has not been found",
            });
        }
        return res.status(200).json({
            msg: "The task has been deleted: ",
            data: result,
        });
    } catch (error) {
        return res.json({
            message: `an error ocurred: ${error}`,
        });
    }
};
