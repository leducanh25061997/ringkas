import classNames from 'classnames';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectType } from '../../../slice/types';

interface Props extends ProjectType {
  projectActive?: ProjectType;
  disabled?: boolean;
  onChooseProject: (project: ProjectType) => void;
}

function ProjectCard({
  disabled = false,
  projectActive,
  onChooseProject,
  ...project
}: Props) {
  const { name, unitAvailable = 0, developerName, projectId } = project;
  const unitLeft = unitAvailable;
  const active = projectActive?.projectId === projectId;
  const { t } = useTranslation();

  const handleChooseProject = () => onChooseProject(project);
  return (
    <div
      onClick={handleChooseProject}
      className={classNames(
        'border border-[#C6D7E0] rounded-[10px] p-6 leading-6',
        {
          'cursor-pointer': active || disabled || unitLeft,
          'bg-[#005FC5]': active,
          '!bg-[#DFE3E8] pointer-events-none': disabled || !unitLeft,
        },
      )}
    >
      <div className="flex">
        <div className="w-[80%] pr-10">
          <p
            className={classNames('text-[14px] pr-10', {
              'text-white': active,
              'text-[#9098A7]': !active,
              '!text-[#9098A7]': disabled || !unitLeft,
            })}
          >
            {t(translations.createCustomer.projectName)}
          </p>
          <p
            className={classNames('font-medium', {
              'text-white': active,
              'text-black': !active,
              '!text-[#9098A7]': disabled || !unitLeft,
            })}
          >
            {name}
          </p>
        </div>
        <div className="w-[20%]">
          <p
            className={classNames('text-[14px]', {
              'text-white': active,
              'text-[#9098A7]': !active,
              '!text-[#9098A7]': disabled || !unitLeft,
            })}
          >
            {t(translations.createCustomer.unitLeft)}
          </p>
          <p
            className={classNames('font-medium', {
              'text-white': active,
              'text-black': !active,
              '!text-[#9098A7]': disabled || !unitLeft,
            })}
          >
            {unitLeft}
          </p>
        </div>
      </div>
      <div>
        <p
          className={classNames('text-[14px] mt-[30px]', {
            'text-white': active,
            'text-[#9098A7]': !active,
            '!text-[#9098A7]': disabled || !unitLeft,
          })}
        >
          {t(translations.createCustomer.developer)}
        </p>
        <p
          className={classNames('font-medium', {
            'text-white': active,
            'text-black': !active,
            '!text-[#9098A7]': disabled || !unitLeft,
          })}
        >
          {developerName}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
