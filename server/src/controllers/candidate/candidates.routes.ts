import express from 'express';
import CandidatesControllers from "./modules/candidate.models";
import upload from '../../middlewares/multer.middleware';

const candidatesRoutes = express.Router();
const CANDIDATE_INSTANCE = new CandidatesControllers();

candidatesRoutes.get('/fetchData', CANDIDATE_INSTANCE.CandidateFetchData);
candidatesRoutes.post('/add', upload.fields([{ name: 'pdfFile', maxCount: 1 }]), CANDIDATE_INSTANCE.AddCandidates);
candidatesRoutes.post('/delete', CANDIDATE_INSTANCE.CandidateDelete);
candidatesRoutes.post('/addEmployee', CANDIDATE_INSTANCE.AddEmployee);
candidatesRoutes.put('/edit', CANDIDATE_INSTANCE.EditCandidates);

export default candidatesRoutes;