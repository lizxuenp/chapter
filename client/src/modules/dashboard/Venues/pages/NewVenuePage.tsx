import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useCreateVenueMutation } from '../../../../generated/graphql';
import { Layout } from '../../shared/components/Layout';
import VenueForm, { VenueFormData } from '../components/VenueForm';
import { VENUES } from '../graphql/queries';
import { useParam } from 'hooks/useParam';

export const NewVenuePage: NextPage = () => {
  const chapterId = useParam('id');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [createVenue] = useCreateVenueMutation({
    refetchQueries: [{ query: VENUES }],
  });

  const onSubmit = async (data: VenueFormData) => {
    setLoading(true);
    try {
      const latitude = parseFloat(String(data.latitude));
      const longitude = parseFloat(String(data.longitude));

      const venue = await createVenue({
        variables: { chapterId, data: { ...data, latitude, longitude } },
      });
      if (venue.data) {
        router.replace(`/dashboard/venues/${venue.data.createVenue.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <VenueForm
        loading={loading}
        onSubmit={onSubmit}
        submitText={'Add venue'}
      />
    </Layout>
  );
};
