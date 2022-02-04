/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  token: string;
};

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.electron.ipcRenderer.setToken('toggl-api-token', data.token);
  };

  useEffect(() => {
    window.electron.ipcRenderer.getToken('toggl-api-token');
    // this could take time if use has to approve credential store
    window.electron.ipcRenderer.once('get-password', (arg) => {
      setToken(arg);
    });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="token">
        API Token
        <input
          data-testid="token"
          id="token"
          placeholder="API token"
          required
          type="text"
          defaultValue={token}
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
      <button data-testid="submit" type="submit">
        Save
      </button>
    </form>
  );
};

export default Settings;
