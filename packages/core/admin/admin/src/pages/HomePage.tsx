import * as React from 'react';

import { Box, Button, Flex, Grid, GridItem, Layout, Main, Typography } from '@strapi/design-system';
import { Link, LinkButton } from '@strapi/design-system/v2';
import {
  ContentBox,
  LoadingIndicatorPage,
  useAppInfo,
  useGuidedTour,
  useTracking,
} from '@strapi/helper-plugin';
import {
  ArrowRight,
  CodeSquare,
  Discord,
  Discourse,
  ExternalLink,
  FeatherSquare,
  Github,
  InformationSquare,
  PlaySquare,
  Reddit,
  Strapi,
  Twitter,
} from '@strapi/icons';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { GuidedTourHomepage } from '../components/GuidedTour/Homepage';
import { useContentTypes } from '../hooks/useContentTypes';
import { useEnterprise } from '../hooks/useEnterprise';

import cornerOrnamentPath from './assets/corner-ornament.svg';
import cloudIconBackgroundImage from './assets/strapi-cloud-background.png';
import cloudFlagsImage from './assets/strapi-cloud-flags.svg';

/* -------------------------------------------------------------------------------------------------
 * HomePageCE
 * -----------------------------------------------------------------------------------------------*/

const HomePageCE = () => {
  const { formatMessage } = useIntl();
  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useContentTypes();
  const { guidedTourState, isGuidedTourVisible, isSkipped } = useGuidedTour();
  const showGuidedTour =
    !Object.values(guidedTourState).every((section) =>
      Object.values(section).every((step) => step)
    ) &&
    isGuidedTourVisible &&
    !isSkipped;
  const { push } = useHistory();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    push('/plugins/content-type-builder/content-types/create-content-type');
  };

  const hasAlreadyCreatedContentTypes = React.useMemo(() => {
    /**
     * TODO: this can be done with a `some` call.
     */
    return (
      collectionTypes.filter((c) => c.isDisplayed).length > 1 ||
      singleTypes.filter((c) => c.isDisplayed).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Layout>
      <Helmet
        title={formatMessage({
          id: 'HomePage.helmet.title',
          defaultMessage: 'Homepage',
        })}
      />
      <Main>
        <LogoContainer>
          <img alt="" aria-hidden src={cornerOrnamentPath} />
        </LogoContainer>
        <Box padding={10}>
          <Grid>
            <GridItem col={8} s={12}>
              <div>
                <Box paddingLeft={6} paddingBottom={10}>
                  <Flex direction="column" alignItems="flex-start" gap={5}>
                    <Typography as="h1" variant="alpha">
                      {formatMessage({
                          id: 'mustluik.hello',
                          defaultMessage: 'Hi 👋',
                      })}
                    </Typography>
                    <WordWrap textColor="neutral600" variant="epsilon">
                    {formatMessage({
                      id: 'mustluik.intro',
                      defaultMessage:
                        'Here you can prepare, conduct and analyze media trainings.',
                    })}
                    </WordWrap>
                    <Link startIcon={<ArrowRight />} isExternal={false} href="/admin/plugins/mustluik/game">
                        {formatMessage({
                          id: 'mustluik.plan-game',
                          defaultMessage: 'Go directly to game view.',
                        })}
                    </Link>
                    <Link startIcon={<ArrowRight />} isExternal={false} href="/admin/content-manager/collectionType/api::article.article">
                        {formatMessage({
                          id: 'mustluik.add-articles',
                          defaultMessage: 'Go directly to content management.',
                        })}
                    </Link>
                    <Link startIcon={<ArrowRight />} disabled href="#">
                        {formatMessage({
                          id: 'mustluik.invite-players',
                          defaultMessage: 'Read manual',
                        })}
                    </Link>
                  </Flex>
                </Box>
              </div>
            </GridItem>
          </Grid>
        </Box>
      </Main>
    </Layout>
  );
};

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;

const WordWrap = styled(Typography)`
  word-break: break-word;
`;

const BlockLink = styled.a`
  text-decoration: none;
`;

const CloudCustomWrapper = styled(Box)`
  background-image: url(${cloudIconBackgroundImage});
`;

const CloudIconWrapper = styled(Flex)`
  background: rgba(255, 255, 255, 0.3);
`;

/* -------------------------------------------------------------------------------------------------
 * SocialLinks
 * -----------------------------------------------------------------------------------------------*/

const SocialLinks = () => {
  const { formatMessage } = useIntl();
  const { communityEdition } = useAppInfo();

  const socialLinksExtended = [
    ...SOCIAL_LINKS,
    {
      icon: <StyledStrapi />,
      link: communityEdition
        ? 'https://discord.strapi.io'
        : 'https://support.strapi.io/support/home',
      name: {
        id: 'Settings.application.get-help',
        defaultMessage: 'Get help',
      },
    },
  ];

  return (
    <Flex
      as="aside"
      direction="column"
      aria-labelledby="join-the-community"
      background="neutral0"
      hasRadius
      paddingRight={5}
      paddingLeft={5}
      paddingTop={6}
      paddingBottom={6}
      shadow="tableShadow"
      gap={7}
    >
      <Flex direction="column" alignItems="stretch" gap={5}>
        <Flex direction="column" alignItems="stretch" gap={3}>
          <Typography variant="delta" as="h2" id="join-the-community">
            {formatMessage({
              id: 'app.components.HomePage.community',
              defaultMessage: 'Join the community',
            })}
          </Typography>
          <Typography textColor="neutral600">
            {formatMessage({
              id: 'app.components.HomePage.community.content',
              defaultMessage:
                'Discuss with team members, contributors and developers on different channels',
            })}
          </Typography>
        </Flex>
        <Link href="https://feedback.strapi.io/" isExternal endIcon={<ExternalLink />}>
          {formatMessage({
            id: 'app.components.HomePage.roadmap',
            defaultMessage: 'See our road map',
          })}
        </Link>
      </Flex>
      <GridGap>
        {socialLinksExtended.map(({ icon, link, name }) => {
          return (
            <GridItem col={6} s={12} key={name.id}>
              <LinkCustom size="L" startIcon={icon} variant="tertiary" href={link} isExternal>
                {formatMessage(name)}
              </LinkCustom>
            </GridItem>
          );
        })}
      </GridGap>
    </Flex>
  );
};

const StyledDiscord = styled(Discord)`
  path {
    fill: #7289da !important;
  }
`;

const StyledReddit = styled(Reddit)`
  > path:first-child {
    fill: #ff4500;
  }
`;
const StyledStrapi = styled(Strapi)`
  > path:first-child {
    fill: #4945ff;
  }
  > path:nth-child(2) {
    fill: #fff;
  }
  > path:nth-child(4) {
    fill: #9593ff;
  }
`;

const StyledTwitter = styled(Twitter)`
  path {
    fill: #1da1f2 !important;
  }
`;

const StyledDiscourse = styled(Discourse)`
  > path:first-child {
    fill: #231f20;
  }
  > path:nth-child(2) {
    fill: #fff9ae;
  }
  > path:nth-child(3) {
    fill: #00aeef;
  }
  > path:nth-child(4) {
    fill: #00a94f;
  }
  > path:nth-child(5) {
    fill: #f15d22;
  }
  > path:nth-child(6) {
    fill: #e31b23;
  }
`;

const LinkCustom = styled(LinkButton)`
  display: flex;
  align-items: center;
  border: none;

  svg {
    width: ${({ theme }) => theme.spaces[6]};
    height: ${({ theme }) => theme.spaces[6]};
  }

  span {
    word-break: keep-all;
  }
`;

const GridGap = styled(Grid)`
  row-gap: ${({ theme }) => theme.spaces[2]};
  column-gap: ${({ theme }) => theme.spaces[4]};
`;

const SOCIAL_LINKS = [
  {
    name: { id: 'app.components.HomePage.community.links.github', defaultMessage: 'Github' },
    link: 'https://github.com/strapi/strapi/',
    icon: <Github fill="#7289DA" />,
    alt: 'github',
  },
  {
    name: { id: 'app.components.HomePage.community.links.discord', defaultMessage: 'Discord' },
    link: 'https://discord.strapi.io/',
    icon: <StyledDiscord />,
    alt: 'discord',
  },
  {
    name: { id: 'app.components.HomePage.community.links.reddit', defaultMessage: 'Reddit' },
    link: 'https://www.reddit.com/r/Strapi/',
    icon: <StyledReddit />,
    alt: 'reddit',
  },
  {
    name: { id: 'app.components.HomePage.community.links.twitter', defaultMessage: 'Twitter' },
    link: 'https://twitter.com/strapijs',
    icon: <StyledTwitter />,
    alt: 'twitter',
  },
  {
    name: { id: 'app.components.HomePage.community.links.forum', defaultMessage: 'Forum' },
    link: 'https://forum.strapi.io',
    icon: <StyledDiscourse />,
    alt: 'forum',
  },
  {
    name: { id: 'app.components.HomePage.community.links.blog', defaultMessage: 'Blog' },
    link: 'https://strapi.io/blog?utm_source=referral&utm_medium=admin&utm_campaign=career%20page',
    icon: <StyledStrapi />,
    alt: 'blog',
  },
  {
    name: {
      id: 'app.components.HomePage.community.links.career',
      defaultMessage: 'We are hiring!',
    },
    link: 'https://strapi.io/careers?utm_source=referral&utm_medium=admin&utm_campaign=blog',
    icon: <StyledStrapi />,
    alt: 'career',
  },
];

/* -------------------------------------------------------------------------------------------------
 * HomePage
 * -----------------------------------------------------------------------------------------------*/

const HomePage = () => {
  const Page = useEnterprise(
    HomePageCE,
    // eslint-disable-next-line import/no-cycle
    async () => (await import('../../../ee/admin/src/pages/HomePage')).HomePageEE
  );

  // block rendering until the EE component is fully loaded
  if (!Page) {
    return null;
  }

  return <Page />;
};

export { HomePage, HomePageCE };
