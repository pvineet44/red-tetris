import { Request, Response } from 'express';
import e from 'cors';

const testApi = async (req: Request, res: Response): Promise<void>  => {
    res.status(200).json({
        message: "Test API is now!! working!!"
    })
}

export { testApi }