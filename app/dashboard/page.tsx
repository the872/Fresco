import ResponsiveContainer from '~/components/ResponsiveContainer';
import Heading from '~/components/ui/typography/Heading';
import Section from '~/components/layout/Section';
import PageHeader from '~/components/ui/typography/PageHeader';
import ActivityFeed from './_components/ActivityFeed/ActivityFeed';
import Paragraph from '~/components/ui/typography/Paragraph';
import SummaryStatistics from './_components/SummaryStatistics/SummaryStatistics';
import AnonymousRecruitmentWarning from './protocols/_components/AnonymousRecruitmentWarning';
import { Suspense } from 'react';
import { searchParamsCache } from './_components/ActivityFeed/searchParamsCache';
import { requireAppNotExpired } from '~/queries/appSettings';
import { requirePageAuth } from '~/utils/auth';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  await requireAppNotExpired();
  await requirePageAuth();

  searchParamsCache.parse(searchParams);

  return (
    <>
      <ResponsiveContainer>
        <PageHeader
          headerText="Dashboard"
          subHeaderText="Welcome to Fresco! This page provides an overview of your recent activity and key metrics."
        />
      </ResponsiveContainer>
      <Suspense>
        <AnonymousRecruitmentWarning />
      </Suspense>
      <SummaryStatistics />
      <ResponsiveContainer>
        <Heading variant="h2">Recent Activity</Heading>
        <Paragraph>
          This table summarizes the most recent activity within Fresco. Use it
          to keep track of new protocols, interviews, and participants.
        </Paragraph>
      </ResponsiveContainer>
      <ResponsiveContainer maxWidth="6xl">
        <Section>
          <ActivityFeed />
        </Section>
      </ResponsiveContainer>
    </>
  );
}
