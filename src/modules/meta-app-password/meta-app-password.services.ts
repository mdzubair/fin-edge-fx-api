import { FormPayloadData } from "../../interface/index.interface";
import * as metaAppRepository from "./meta-app-password.repository";

export const create = async (reqData: FormPayloadData) => {
  return metaAppRepository.create(reqData);
};