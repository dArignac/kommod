/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  token: string;
};

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      token: window.localStorage.getItem('token') || '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.localStorage.setItem('token', data.token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="token">
        API Token
        <input
          type="text"
          id="token"
          placeholder="API token"
          required
          {...register('token', { required: true })}
        />
        <small>
          You can find the API token at{' '}
          <a
            href="https://track.toggl.com/profile"
            target="_blank"
            rel="noreferrer"
          >
            https://track.toggl.com/profile
          </a>
        </small>{' '}
      </label>
      {errors.token && <span>This field is required</span>}
      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
