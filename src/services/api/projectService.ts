import { Pageable } from 'types';
import {
  ChangeProjectStatus,
  FilterProjectParams,
  ProjectInformation,
  ProjectInformationParams,
  ProjectManagement,
  ProjectTask,
} from 'types/ProjectManagement';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '' && !Array.isArray(params[p])) {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      } else if (Array.isArray(params[p]) && params[p].length) {
        params[p].map((item: any) => {
          str.push(encodeURIComponent(p) + '=' + item);
        });
      }
    }
  return str.join('&');
};

const fetchProvinces = async (): Promise<string[]> => {
  const response = await instance.get(`/provinces`);
  return response.data;
};

const fetCities = async (params: string): Promise<string[]> => {
  const response = await instance.get(`/province/${params}/cities`);
  return response.data;
};

const fetchProjectList = async (
  params: FilterProjectParams,
): Promise<Pageable<ProjectManagement>> => {
  const newParams = { ...params };
  const response = await instance.get(
    `/console/projects?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchProjects = async (): Promise<Pageable<ProjectManagement>> => {
  const response = await instance.get(`/console/projects`);
  const res = response.data.data;
  return res;
};

const createProject = async (
  params: ProjectInformationParams,
): Promise<ProjectInformation> => {
  const response = await instance.post(`/console/project`, params);
  return response.data;
};

const updateProject = async (
  params: ProjectInformationParams,
): Promise<ProjectInformation> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/console/project/${params.id}`,
    newParams,
  );
  return response.data;
};

const getProjectDetail = async (
  params: string,
): Promise<ProjectInformation> => {
  const response = await instance.get(`/console/project/${params}`);
  return response.data;
};

const getProjectTaskList = async (
  params: string,
): Promise<Pageable<ProjectTask>> => {
  const response = await instance.get(`/console/project/${params}/tasks`);
  return response.data;
};

const updateProjectTask = async (params: ProjectTask): Promise<ProjectTask> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `console/project/task/${params.id}`,
    newParams,
  );
  return response.data;
};

const createProjectTask = async (params: ProjectTask): Promise<ProjectTask> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.post(
    `/console/project/${params.id}/task`,
    newParams,
  );
  return response.data;
};

const createMultiProjectTask = async (
  params: ProjectTask[],
): Promise<ProjectTask[]> => {
  const response = await instance.put(`console/project/tasks`, params);
  return response.data;
};

const updateProjectStatus = async (
  params: ChangeProjectStatus,
): Promise<ChangeProjectStatus> => {
  const newParams = { ...params };
  delete newParams.projectId;
  const response = await instance.put(
    `/console/project/${params.projectId}/status`,
    newParams,
  );
  return response.data;
};

export default {
  fetchProvinces,
  fetCities,
  fetchProjectList,
  fetchProjects,
  createProject,
  updateProject,
  updateProjectStatus,
  getProjectDetail,
  getProjectTaskList,
  updateProjectTask,
  createProjectTask,
  createMultiProjectTask,
};
