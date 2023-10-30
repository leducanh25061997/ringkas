import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import { Pagination, PaginationItem } from '@mui/material';
import Spinner from 'app/components/Spinner';
import useRoles from 'app/hooks/useRoles';
import useUpdateEffect from 'app/hooks/useUpdateEffect';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useManageCustomerSlice } from '../../../slice';
import { selectManageCustomer } from '../../../slice/selectors';
import ProjectCard from './ProjectCard';

interface Props {
  city: string;
  formMethod: UseFormReturn<FieldValues, any>;
}

function ListProject({
  city,
  formMethod: { control, watch, trigger, resetField },
}: Props) {
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const role = useRoles();
  const { projectsData } = useSelector(selectManageCustomer);

  useEffect(() => {
    getData(0, city);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useUpdateEffect(() => {
    getData(page, city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const housePrice = watch('housePrice');

  const getData = (page: number, location: string) => {
    setIsLoading(true);
    if (role === 'developer') {
      dispatch(
        actions.getListProjectByOwner(
          {
            page,
            location,
          },
          () => {
            setIsLoading(false);
          },
          (e: string) => {
            setIsLoading(false);
          },
        ),
      );
      return;
    }

    dispatch(
      actions.getListProject(
        {
          page,
          location,
        },
        () => {
          setIsLoading(false);
        },
        (e: string) => {
          setIsLoading(false);
        },
      ),
    );
  };

  return (
    <>
      <Controller
        name="project"
        rules={{ required: !housePrice }}
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-4 gap-4 2xl:gap-8 pb-8 border-b border-b-[#C6D7E0] px-8 mt-6 relative min-h-[200px]">
            {isLoading && (
              <div className="inset-0 absolute z-1 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {projectsData?.data.map(item => (
              <ProjectCard
                key={item.projectId}
                {...item}
                disabled={!!watch('housePrice')}
                projectActive={field.value}
                onChooseProject={project => {
                  resetField('projectType');
                  resetField('unit');
                  resetField('housePrice');

                  if (
                    item.projectId === field.value?.projectId &&
                    field.value
                  ) {
                    field.onChange(undefined);
                  } else field.onChange(project);
                  trigger('housePrice');
                }}
              />
            ))}
          </div>
        )}
      />

      <div className="flex h-[42px] justify-end px-20 py-[5px]">
        {projectsData?.total && !isLoading ? (
          <Pagination
            color="secondary"
            variant="outlined"
            showFirstButton
            shape="rounded"
            className="pagination"
            showLastButton
            count={Math.ceil(projectsData.total / 8)}
            page={page + 1}
            onChange={(e, page) => setPage(page - 1)}
            renderItem={item => (
              <PaginationItem
                components={{
                  first: KeyboardDoubleArrowLeftSharpIcon,
                  last: KeyboardDoubleArrowRightSharpIcon,
                }}
                {...item}
              />
            )}
          />
        ) : null}
      </div>
    </>
  );
}

export default ListProject;
