import {
  Heading,
  Spinner,
  VStack,
  Text,
  Grid,
  GridItem,
  Button,
  useToast,
  Checkbox,
  CheckboxGroup,
  HStack,
} from '@chakra-ui/react';

import React, { useState } from 'react';

import { ChapterCard } from 'components/ChapterCard';
import { EventCard } from 'components/EventCard';
import { useHomeQuery } from 'generated/graphql';

const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore } = useHomeQuery({
    variables: { offset: 0, limit: 2 },
  });
  console.log({ data });

  const toast = useToast();
  const onLoadMore = async () => {
    try {
      const res = await fetchMore({
        variables: { offset: data?.paginatedEvents.length },
      });
      setHasMore(res.data.paginatedEvents.length > 0);
    } catch (err) {
      if (err instanceof Error) {
        toast({ title: err.message || err.name });
      } else {
        toast({ title: 'An unexpected error occurred' });
        console.log(err);
      }
    }
  };

  const filterLoad = async () => {
    //how should I them
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" columnGap={10} mt="5">
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <VStack align="flex-start">
          <Heading>Upcoming events</Heading>

          <CheckboxGroup colorScheme="teal">
            Choose Event to hide:
            <HStack spacing={5}>
              <Checkbox id="privateSelector" value="private">
                Private
              </Checkbox>
              <Checkbox id="canseledSelector" value="canseled">
                Canseled
              </Checkbox>
              {/* need to check if it has data-checked attributed */}
              <Button onClick={filterLoad}>Filter</Button>
            </HStack>
          </CheckboxGroup>

          {loading ? (
            <Spinner />
          ) : error || !data ? (
            <>
              <Heading size="md" color="red.400">
                😕 Something went wrong
              </Heading>
              <Text>{error?.message}</Text>
            </>
          ) : (
            data.paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}

          {hasMore ? (
            <Button onClick={onLoadMore}>Click for more</Button>
          ) : (
            <Heading size="md">No more</Heading>
          )}
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        <VStack align="flex-start">
          <Heading>Chapters</Heading>
          {loading ? (
            <Spinner />
          ) : error || !data ? (
            <>
              <Heading size="md" color="red.400">
                😕 Something went wrong
              </Heading>
              <Text>{error?.message}</Text>
            </>
          ) : (
            data.chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Home;
