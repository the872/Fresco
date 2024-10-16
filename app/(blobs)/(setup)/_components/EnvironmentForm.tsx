'use client';

import { setAppSetting } from '~/actions/appSettings';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import useZodForm from '~/hooks/useZodForm';
import { createEnvironmentSchema } from '~/schemas/environment';

export const EnvironmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useZodForm({
    schema: createEnvironmentSchema,
  });

  const onSubmit = async ({
    uploadThingToken,
  }: {
    uploadThingToken: string;
  }) => {
    await setAppSetting('uploadThingToken', uploadThingToken);
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <div className="mb-6 flex">
        <Input
          label="UPLOADTHING_TOKEN"
          hint="Copy and paste the full token from your UploadThing dashboard."
          type="text"
          placeholder="UPLOADTHING_TOKEN=******************"
          error={errors.uploadThingToken?.message}
          {...register('uploadThingToken')}
        />
      </div>
      <div className="flex flex-wrap">
        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
