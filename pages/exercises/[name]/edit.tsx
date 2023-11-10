import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useEffect, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import DurationInputField from '../../../components/DurationInputField/DurationInputField';
import { ExerciseType } from '@prisma/client';
import ExerciseTypePickerField from '../../../components/ExerciseTypePickerField/ExerciseTypePickerField';
import { ExerciseWithPersonalBestAndLastPerformed } from '../../../database/domains/exercise';
import LoadingButton from '../../../components/LoadingButton/LoadingButton';
import MdFilledTextFieldField from '../../../components/MdOutlinedTextFieldField/MdOutlinedTextFieldField';
import MuscleGroupPickerField from '../../../components/MuscleGroupPickerField/MuscleGroupPickerField';
import { NextPageWithLayout } from '../../_app';
import RouteLoader from '../../../components/RouteLoader/RouteLoader';
import SetCountPickerField from '../../../components/SetCountPickerField/SetCountPickerField';
import { SnackbarContext } from '../../../providers/Snackbar/Snackbar';
import classNames from 'classnames';
import { getFormikInitiallyTouchedFields } from '../../../utils/formik-initially-touched';
import styles from './ExerciseEdit.module.scss';
import { useFetchJSON } from '../../../utils/fetch-json';
import { useHeadWithTitle } from '../../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

Yup.addMethod(Yup.array, 'unique', function (message, mapper = (a: any) => a) {
  return this.test('unique', message, (list: any[] | undefined) => {
    if (!list) {
      return false;
    }
    if (list.every((item) => !item)) {
      return true;
    }
    return list.length === new Set(list.map(mapper)).size;
  });
});

const ExerciseSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  setCount: Yup.number()
    .integer('Set Count must be a number')
    .positive('Set Count must be more than zero')
    .max(5, 'Set Count cannot be higher than 5')
    .required('Set Count is required'),
  primaryMuscleGroup: Yup.string().required('Primary Muscle Group is required'),
  secondaryMuscleGroups: Yup.array()
    .when(['primaryMuscleGroup'], (primaryMuscleGroup, schema) => {
      return schema.of(
        Yup.string()
          .optional()
          .notOneOf(
            [primaryMuscleGroup],
            !!primaryMuscleGroup ? 'All muscle groups must be unique\n' : ''
          )
      );
    })
    //@ts-ignore
    .unique('All muscle groups must be unique\n'),
  minimumRecommendedRepetitions: Yup.number()
    .nullable()
    .integer('Minimum must be a number')
    .positive('Minimum must be more than zero')
    .when(
      ['exerciseType', 'maximumRecommendedRepetitions'],
      //@ts-ignore
      (
        exerciseType: ExerciseType,
        maximumRecommendedRepetitions: number,
        schema: Yup.NumberSchema
      ) => {
        schema = schema.max(
          maximumRecommendedRepetitions - 1,
          'Minimum must be less than maximum'
        );
        if (exerciseType === 'assisted' || exerciseType === 'weighted') {
          schema = schema.required('Minimum is required');
        }
        return schema;
      }
    ),
  maximumRecommendedRepetitions: Yup.number()
    .nullable()
    .integer('Maximum must be a number')
    .positive('Maximum must be more than zero')
    .when(
      ['exerciseType'],
      //@ts-ignore
      (exerciseType: ExerciseType, schema: Yup.NumberSchema) => {
        if (exerciseType === 'assisted' || exerciseType === 'weighted') {
          schema = schema.required('Maximum is required');
        }
        return schema;
      }
    ),
  timePerSetInSeconds: Yup.number()
    .nullable()
    .integer('Maximum must be a number')
    .positive('Time Per Set must be more than zero')
    .max(18000, 'Time Per Set must be less than 5 hours')
    .when(
      ['exerciseType'],
      //@ts-ignore
      (exerciseType: ExerciseType, schema: Yup.NumberSchema) => {
        if (exerciseType === 'timed') {
          schema = schema.required('Time Per Set is required');
        }
        return schema;
      }
    ),
});

const ExerciseEdit: NextPageWithLayout = () => {
  const router = useRouter();

  const exerciseName = router.query.name as string;

  const head = useHeadWithTitle(
    exerciseName ? `Edit ${exerciseName}` : 'Edit Exercise'
  );

  const standardFormInputStyles = useMemo(
    () => classNames('standard-form-input', styles.input),
    []
  );

  const { openSnackbar } = useContext(SnackbarContext);

  const fetcher = useFetchJSON();

  const { data: exercise, error } =
    useSWR<ExerciseWithPersonalBestAndLastPerformed>(
      router.isReady ? `/api/exercise/${exerciseName}` : null,
      fetcher
    );

  useEffect(() => {
    if (error?.status === 404) {
      openSnackbar(`This exercise no longer exists.`);
      router.replace('/exercises');
    }
  }, [error, openSnackbar, router]);

  if (!exercise) {
    return <RouteLoader />;
  }

  return (
    <div className={styles.root}>
      {head}
      <Formik
        initialTouched={getFormikInitiallyTouchedFields(exercise)}
        initialValues={exercise}
        validationSchema={ExerciseSchema}
        onSubmit={async (values) => {
          values.secondaryMuscleGroups = values.secondaryMuscleGroups?.filter(
            (group) => !!group
          );
          if (
            values.exerciseType === 'timed' ||
            values.exerciseType === 'rep_based'
          ) {
            values.minimumRecommendedRepetitions = null;
            values.maximumRecommendedRepetitions = null;
          }
          if (values.exerciseType !== 'timed') {
            values.timePerSetInSeconds = null;
          }
          const { id, name } = await fetch(`/api/exercise`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { 'content-type': 'application/json' },
            credentials: 'same-origin',
          }).then((res) => res.json());
          openSnackbar('Exercise saved successfully.');
          router.replace(`/exercises/${encodeURIComponent(name)}`);
        }}
      >
        {(formik) => {
          const {
            isValid,
            isSubmitting,
            resetForm,
            values,
            setFieldValue,
            validateForm,
            errors,
          } = formik;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (
              values.exerciseType === 'timed' ||
              values.exerciseType === 'rep_based'
            ) {
              setFieldValue('minimumRecommendedRepetitions', '');
              setFieldValue('maximumRecommendedRepetitions', '');
              validateForm();
            }
            if (values.exerciseType !== 'timed') {
              setFieldValue('timePerSetInSeconds', null);
              validateForm();
            }
          }, [setFieldValue, validateForm, values.exerciseType]);

          return (
            <Form>
              <MdFilledTextFieldField
                aria-label='Name'
                autoFocus
                id='name'
                name='name'
                disabled={isSubmitting}
              />
              <label htmlFor='setCount'>Primary Muscle Group</label>
              <MuscleGroupPickerField
                name='primaryMuscleGroup'
                disabled={isSubmitting}
                className={styles.muscleGroupPicker}
              />
              <ErrorMessage
                name='primaryMuscleGroup'
                component='span'
                className={styles.errorMessage}
              />
              <label htmlFor='setCount'>Secondary Muscle Groups</label>
              <MuscleGroupPickerField
                name='secondaryMuscleGroups[0]'
                disabled={isSubmitting}
                className={styles.muscleGroupPicker}
              />
              <MuscleGroupPickerField
                name='secondaryMuscleGroups[1]'
                disabled={isSubmitting}
                className={styles.muscleGroupPicker}
              />
              <ErrorMessage
                name='secondaryMuscleGroups'
                component='pre'
                className={styles.errorMessage}
              />
              <ErrorMessage
                name='secondaryMuscleGroups[0]'
                component='pre'
                className={styles.errorMessage}
              />
              <ErrorMessage
                name='secondaryMuscleGroups[1]'
                component='pre'
                className={styles.errorMessage}
              />
              <label htmlFor='setCount'>Set Count</label>
              <SetCountPickerField name='setCount' disabled={isSubmitting} />
              <ErrorMessage
                name='setCount'
                component='span'
                className={styles.errorMessage}
              />
              <label htmlFor='exerciseType'>Exercise Type</label>
              <ExerciseTypePickerField
                name='exerciseType'
                disabled={isSubmitting}
              />
              {(formik.values.exerciseType === 'assisted' ||
                formik.values.exerciseType === 'weighted') && (
                <>
                  <label htmlFor='minimumRecommendedRepetitions'>
                    Recommended Repetitions
                  </label>
                  <div className={styles.repetitions}>
                    <Field
                      type='number'
                      inputMode='decimal'
                      id='minimumRecommendedRepetitions'
                      name='minimumRecommendedRepetitions'
                      className={classNames('standard-form-input')}
                      disabled={isSubmitting}
                    />
                    <span>to</span>
                    <Field
                      type='number'
                      inputMode='decimal'
                      id='maximumRecommendedRepetitions'
                      name='maximumRecommendedRepetitions'
                      className={classNames('standard-form-input')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <ErrorMessage
                    name='maximumRecommendedRepetitions'
                    component='span'
                    className={styles.errorMessage}
                  />
                  <ErrorMessage
                    name='minimumRecommendedRepetitions'
                    component='span'
                    className={styles.errorMessage}
                  />
                </>
              )}
              {formik.values.exerciseType === 'timed' && (
                <>
                  <label htmlFor='timePerSetInSeconds'>Time Per Set</label>
                  <DurationInputField name='timePerSetInSeconds' />
                  <ErrorMessage
                    name='timePerSetInSeconds'
                    component='span'
                    className={styles.errorMessage}
                  />
                </>
              )}
              <div className={styles.buttonBar}>
                <button
                  type='button'
                  className='standard-button'
                  onClick={() => resetForm()}
                  disabled={isSubmitting}
                >
                  <i className='fa-solid fa-rotate-left'></i>
                  Reset
                </button>
                <LoadingButton
                  className='standard-button primary'
                  type='submit'
                  disabled={!isValid}
                  loadingText='Saving'
                >
                  <i className='fa-solid fa-floppy-disk'></i>
                  Save
                </LoadingButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ExerciseEdit.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>{page}</AppBarWithAppHeaderLayout>
);

export default ExerciseEdit;
