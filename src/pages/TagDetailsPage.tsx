import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Grid,
  Card,
  Badge,
  Button,
  Box,
  Avatar,
  Anchor,
  SimpleGrid,
  ThemeIcon,
  Progress,
  Breadcrumbs,
  Select,
  Tabs,
  ActionIcon,
  Tooltip,
  Center,
} from "@mantine/core";
import {
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiCode,
  FiTag,
  FiGitBranch,
  FiHeart,
  FiBook,
  FiGlobe,
  FiArrowUp,
  FiActivity,
  FiFilter,
  FiExternalLink,
  FiGithub,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";

const TagDetailsPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const { tagName } = useParams<{ tagName: string }>();
  const [sortBy, setSortBy] = useState("trending");
  const [_timeRange] = useState("week");

  // Mock tag data based on the tag name
  const getTagData = (tag: string) => {
    const tagData: Record<string, any> = {
      react: {
        name: "React",
        description: "A JavaScript library for building user interfaces",
        category: "Frontend Framework",
        projectCount: 1240,
        developerCount: 892,
        weeklyGrowth: 18,
        totalStars: 45600,
        color: "blue",
        relatedTags: ["javascript", "typescript", "nextjs", "redux", "hooks"],
        officialWebsite: "https://reactjs.org",
        documentation: "https://reactjs.org/docs",
        github: "https://github.com/facebook/react",
      },
      kubernetes: {
        name: "Kubernetes",
        description: "Production-Grade Container Orchestration",
        category: "DevOps & Infrastructure",
        projectCount: 890,
        developerCount: 567,
        weeklyGrowth: 25,
        totalStars: 32400,
        color: "cyan",
        relatedTags: ["docker", "devops", "cloud", "microservices", "helm"],
        officialWebsite: "https://kubernetes.io",
        documentation: "https://kubernetes.io/docs",
        github: "https://github.com/kubernetes/kubernetes",
      },
      python: {
        name: "Python",
        description:
          "Python is a programming language that lets you work quickly",
        category: "Programming Language",
        projectCount: 1580,
        developerCount: 1240,
        weeklyGrowth: 12,
        totalStars: 78900,
        color: "green",
        relatedTags: [
          "django",
          "flask",
          "machine-learning",
          "data-science",
          "ai",
        ],
        officialWebsite: "https://python.org",
        documentation: "https://docs.python.org",
        github: "https://github.com/python/cpython",
      },
    };

    return tagData[tag?.toLowerCase() || "react"] || tagData.react;
  };

  const tagData = getTagData(tagName || "react");

  const trendingProjects = [
    {
      name: "modern-react-template",
      author: "frontend-masters",
      description:
        "Modern React template with TypeScript, Vite, and best practices",
      stars: 2340,
      forks: 450,
      language: "TypeScript",
      avatar: "https://github.com/identicons/frontend-masters.png",
      link: "/projects/modern-react-template",
      lastUpdated: "2 days ago",
      weeklyStars: 125,
    },
    {
      name: "react-dashboard-pro",
      author: "ui-builders",
      description: "Professional dashboard template with React and Material-UI",
      stars: 1890,
      forks: 320,
      language: "JavaScript",
      avatar: "https://github.com/identicons/ui-builders.png",
      link: "/projects/react-dashboard-pro",
      lastUpdated: "1 day ago",
      weeklyStars: 89,
    },
    {
      name: "react-native-starter",
      author: "mobile-dev-team",
      description:
        "Complete React Native starter with navigation and state management",
      stars: 1456,
      forks: 280,
      language: "JavaScript",
      avatar: "https://github.com/identicons/mobile-dev-team.png",
      link: "/projects/react-native-starter",
      lastUpdated: "3 days ago",
      weeklyStars: 67,
    },
    {
      name: "react-hooks-library",
      author: "hooks-experts",
      description: "Collection of custom React hooks for common use cases",
      stars: 3240,
      forks: 680,
      language: "TypeScript",
      avatar: "https://github.com/identicons/hooks-experts.png",
      link: "/projects/react-hooks-library",
      lastUpdated: "1 day ago",
      weeklyStars: 156,
    },
  ];

  const topDevelopers = [
    {
      name: "Sarah Johnson",
      username: "sarah-react-dev",
      bio: "Senior React developer with 8+ years of experience building scalable web applications",
      followers: 3240,
      projects: 45,
      avatar: "https://github.com/identicons/sarah-react-dev.png",
      contributions: 156,
      link: "/users/sarah-react-dev",
    },
    {
      name: "Michael Chen",
      username: "mike-frontend",
      bio: "Full-stack developer specializing in React and Node.js ecosystems",
      followers: 2890,
      projects: 38,
      avatar: "https://github.com/identicons/mike-frontend.png",
      contributions: 142,
      link: "/users/mike-frontend",
    },
    {
      name: "Emily Rodriguez",
      username: "emily-ui-expert",
      bio: "UI/UX engineer creating beautiful React components and design systems",
      followers: 4120,
      projects: 52,
      avatar: "https://github.com/identicons/emily-ui-expert.png",
      contributions: 203,
      link: "/users/emily-ui-expert",
    },
  ];

  const weeklyStats = {
    newProjects: 24,
    newDevelopers: 156,
    totalContributions: 892,
    topLanguage: "TypeScript",
  };

  const learningResources = [
    {
      title: "Official React Documentation",
      description: "Comprehensive guide to React concepts and API",
      type: "Documentation",
      url: "https://reactjs.org/docs",
      difficulty: "Beginner",
    },
    {
      title: "React Patterns and Best Practices",
      description:
        "Advanced patterns for building maintainable React applications",
      type: "Tutorial",
      url: "#",
      difficulty: "Advanced",
    },
    {
      title: "Testing React Applications",
      description:
        "Complete guide to testing React components and applications",
      type: "Course",
      url: "#",
      difficulty: "Intermediate",
    },
  ];

  const breadcrumbItems = [
    { title: "Explore", href: "/explore" },
    { title: "Tags", href: "/explore#tags" },
    { title: tagData.name, href: "#" },
  ].map((item, index) => (
    <Anchor key={index} component={Link} to={item.href} size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

        {/* Header Section */}
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Group>
              <ThemeIcon size="xl" variant="light" color={tagData.color}>
                <FiTag size={32} />
              </ThemeIcon>
              <div>
                <Group gap="xs" mb="xs">
                  <Title order={1}>#{tagData.name}</Title>
                  <Badge variant="light" color={tagData.color} size="lg">
                    {tagData.category}
                  </Badge>
                </Group>
                <Text size="lg" c="dimmed" maw={600}>
                  {tagData.description}
                </Text>
              </div>
            </Group>

            <Group>
              <Tooltip label="Follow this tag">
                <Button variant="outline" leftSection={<FiHeart size={16} />}>
                  Follow
                </Button>
              </Tooltip>
              <Tooltip label="Share tag">
                <ActionIcon variant="outline" size="lg">
                  <FiShare2 size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          {/* Tag Statistics */}
          <Group gap="sm">
            <Button
              variant="light"
              leftSection={<FiCode size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              {tagData.projectCount.toLocaleString()} Projects
            </Button>
            <Button
              variant="light"
              leftSection={<FiUsers size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              {tagData.developerCount.toLocaleString()} Developers
            </Button>
            <Button
              variant="light"
              leftSection={<FiStar size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              {tagData.totalStars.toLocaleString()} Stars
            </Button>
            <Button
              variant="light"
              leftSection={<FiTrendingUp size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              +{tagData.weeklyGrowth}% Growth
            </Button>
            {/* </Group>

          {/* Quick Links 
          <Group gap="sm"> */}
            {tagData.officialWebsite && (
              <Button
                variant="light"
                leftSection={<FiGlobe size={16} />}
                rightSection={<FiExternalLink size={14} />}
                component="a"
                href={tagData.officialWebsite}
                target="_blank"
              >
                Official Website
              </Button>
            )}
            {tagData.documentation && (
              <Button
                variant="light"
                leftSection={<FiBook size={16} />}
                rightSection={<FiExternalLink size={14} />}
                component="a"
                href={tagData.documentation}
                target="_blank"
              >
                Documentation
              </Button>
            )}
            {tagData.github && (
              <Button
                variant="light"
                leftSection={<FiGithub size={16} />}
                rightSection={<FiExternalLink size={14} />}
                component="a"
                href={tagData.github}
                target="_blank"
              >
                GitHub
              </Button>
            )}
          </Group>
        </Stack>

        <Tabs defaultValue="projects">
          <Tabs.List mb="xl">
            <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
              Projects ({tagData.projectCount})
            </Tabs.Tab>
            <Tabs.Tab value="developers" leftSection={<FiUsers size={16} />}>
              Developers ({tagData.developerCount})
            </Tabs.Tab>
            <Tabs.Tab value="analytics" leftSection={<FiActivity size={16} />}>
              Analytics
            </Tabs.Tab>
            <Tabs.Tab value="resources" leftSection={<FiBook size={16} />}>
              Learning Resources
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="projects">
            <Grid>
              <Grid.Col span={9}>
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Title order={3}>Trending Projects</Title>
                    <Group>
                      <Select
                        data={[
                          { value: "trending", label: "Trending" },
                          { value: "stars", label: "Most Stars" },
                          { value: "recent", label: "Recently Updated" },
                          { value: "forks", label: "Most Forks" },
                        ]}
                        value={sortBy}
                        onChange={(value) => setSortBy(value || "trending")}
                        leftSection={<FiFilter size={16} />}
                      />
                    </Group>
                  </Group>

                  <Stack gap="md">
                    {trendingProjects.map((project, index) => (
                      <Card key={project.name} p="lg" withBorder radius="lg">
                        <Grid>
                          <Grid.Col span={8}>
                            <Group mb="sm">
                              <Avatar src={project.avatar} size="md" />
                              <div style={{ flex: 1 }}>
                                <Group gap="xs" mb={4}>
                                  <Anchor
                                    component={Link}
                                    to={project.link}
                                    size="lg"
                                    fw={600}
                                    style={{ textDecoration: "none" }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.textDecoration =
                                        "underline";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.textDecoration =
                                        "none";
                                    }}
                                  >
                                    {project.name}
                                  </Anchor>
                                  <Badge size="sm" variant="light">
                                    #{index + 1}
                                  </Badge>
                                </Group>
                                <Text size="sm" c="dimmed" mb="xs">
                                  by {project.author}
                                </Text>
                                <Text size="sm" c="dimmed" mb="sm">
                                  {project.description}
                                </Text>
                                <Group gap="lg">
                                  <Group gap={4}>
                                    <FiStar size={14} color="#6c757d" />
                                    <Text size="sm" c="dimmed">
                                      {project.stars.toLocaleString()}
                                    </Text>
                                    <Group gap={2} ml="xs">
                                      <FiArrowUp size={12} color="green" />
                                      <Text size="xs" c="green">
                                        +{project.weeklyStars} this week
                                      </Text>
                                    </Group>
                                  </Group>
                                  <Group gap={4}>
                                    <FiGitBranch size={14} color="#6c757d" />
                                    <Text size="sm" c="dimmed">
                                      {project.forks}
                                    </Text>
                                  </Group>
                                  <Text size="sm" c="dimmed">
                                    Updated {project.lastUpdated}
                                  </Text>
                                </Group>
                              </div>
                            </Group>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Group justify="flex-end" align="flex-start">
                              <Badge variant="light">{project.language}</Badge>
                              <ActionIcon variant="subtle">
                                <FiHeart size={16} />
                              </ActionIcon>
                              <ActionIcon variant="subtle">
                                <FiBookmark size={16} />
                              </ActionIcon>
                            </Group>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    ))}
                  </Stack>
                </Stack>
              </Grid.Col>

              <Grid.Col span={3}>
                <Stack gap="lg">
                  {/* Related Tags */}
                  <Card p="md" withBorder radius="lg">
                    <Title order={4} mb="md">
                      Related Tags
                    </Title>
                    <Stack gap="xs">
                      {tagData.relatedTags.map((tag: string) => (
                        <Group key={tag} justify="space-between">
                          <Badge
                            variant="light"
                            component={Link}
                            to={`/tags/${tag}`}
                            style={{ cursor: "pointer" }}
                          >
                            #{tag}
                          </Badge>
                          <Text size="xs" c="dimmed">
                            {Math.floor(Math.random() * 500) + 100}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Card>

                  {/* Weekly Activity */}
                  <Card p="md" withBorder radius="lg">
                    <Title order={4} mb="md">
                      This Week
                    </Title>
                    <Stack gap="sm">
                      <Group justify="space-between">
                        <Text size="sm">New Projects</Text>
                        <Badge variant="light" color="blue">
                          +{weeklyStats.newProjects}
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">New Developers</Text>
                        <Badge variant="light" color="green">
                          +{weeklyStats.newDevelopers}
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">Contributions</Text>
                        <Badge variant="light" color="purple">
                          {weeklyStats.totalContributions}
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">Top Language</Text>
                        <Badge variant="light" color="orange">
                          {weeklyStats.topLanguage}
                        </Badge>
                      </Group>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="developers">
            <Stack gap="lg">
              <Title order={3}>Top Contributors</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                {topDevelopers.map((developer) => (
                  <Card key={developer.username} p="lg" withBorder radius="lg">
                    <Group mb="md">
                      <Avatar src={developer.avatar} size="lg" />
                      <div style={{ flex: 1 }}>
                        <Anchor
                          component={Link}
                          to={developer.link}
                          size="lg"
                          fw={600}
                          style={{ textDecoration: "none" }}
                        >
                          {developer.name}
                        </Anchor>
                        <Text size="sm" c="dimmed">
                          @{developer.username}
                        </Text>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </Group>
                    <Text size="sm" c="dimmed" mb="md">
                      {developer.bio}
                    </Text>
                    <Group justify="space-between">
                      <Group gap="lg">
                        <Text size="sm" c="dimmed">
                          {developer.followers} followers
                        </Text>
                        <Text size="sm" c="dimmed">
                          {developer.projects} projects
                        </Text>
                      </Group>
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="analytics">
            <Grid>
              <Grid.Col span={8}>
                <Stack gap="lg">
                  <Title order={3}>Growth Analytics</Title>
                  <Card p="lg" withBorder radius="lg">
                    <Stack gap="md">
                      <Title order={4}>Project Growth Over Time</Title>
                      <Box h={300} bg="gray.0" style={{ borderRadius: 8 }}>
                        <Center h="100%">
                          <Text c="dimmed">
                            Chart placeholder - Project growth visualization
                          </Text>
                        </Center>
                      </Box>
                    </Stack>
                  </Card>

                  <Card p="lg" withBorder radius="lg">
                    <Stack gap="md">
                      <Title order={4}>Language Distribution</Title>
                      <Box h={200} bg="gray.0" style={{ borderRadius: 8 }}>
                        <Center h="100%">
                          <Text c="dimmed">
                            Chart placeholder - Language distribution
                          </Text>
                        </Center>
                      </Box>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={4}>
                <Card p="md" withBorder radius="lg">
                  <Title order={4} mb="md">
                    Key Metrics
                  </Title>
                  <Stack gap="md">
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Weekly Activity</Text>
                        <Text size="sm" fw={600}>
                          High
                        </Text>
                      </Group>
                      <Progress value={85} color="green" size="sm" />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Community Health</Text>
                        <Text size="sm" fw={600}>
                          Excellent
                        </Text>
                      </Group>
                      <Progress value={95} color="blue" size="sm" />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Growth Rate</Text>
                        <Text size="sm" fw={600}>
                          +{tagData.weeklyGrowth}%
                        </Text>
                      </Group>
                      <Progress
                        value={tagData.weeklyGrowth * 3}
                        color={tagData.color}
                        size="sm"
                      />
                    </div>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="resources">
            <Title order={3} mb="lg">
              Learning Resources
            </Title>
            <Stack gap="md">
              {learningResources.map((resource, index) => (
                <Card key={index} p="lg" withBorder radius="lg">
                  <Group justify="space-between" mb="sm">
                    <div style={{ flex: 1 }}>
                      <Group gap="sm" mb="xs">
                        <Title order={4}>{resource.title}</Title>
                        <Badge variant="light" size="sm">
                          {resource.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          size="sm"
                          color={
                            resource.difficulty === "Beginner"
                              ? "green"
                              : resource.difficulty === "Intermediate"
                                ? "orange"
                                : "red"
                          }
                        >
                          {resource.difficulty}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {resource.description}
                      </Text>
                    </div>
                    <Button
                      variant="light"
                      rightSection={<FiExternalLink size={14} />}
                      component="a"
                      href={resource.url}
                      target="_blank"
                    >
                      View
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default TagDetailsPage;
