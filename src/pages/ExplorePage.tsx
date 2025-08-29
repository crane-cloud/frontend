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
  Tabs,
  TextInput,
  Select,
  Avatar,
  Anchor,
  Divider,
  SimpleGrid,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import {
  FiSearch,
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiCode,
  FiTag,
  FiFilter,
  FiGitBranch,
  FiLayers,
  FiCalendar,
  FiGlobe,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import TrendingTags from "@/components/Trending/TrendingTags";

const ExplorePage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  // Mock data for featured content
  const featuredProjects = [
    {
      name: "nextjs-starter-template",
      author: "vercel-team",
      description:
        "Production-ready Next.js template with TypeScript, Tailwind CSS, and more",
      stars: 3420,
      forks: 890,
      language: "TypeScript",
      avatar: "https://github.com/identicons/vercel-team.png",
      link: "/projects/nextjs-starter-template",
      featured: true,
      tags: ["nextjs", "typescript", "tailwind"],
    },
    {
      name: "kubernetes-dashboard-pro",
      author: "k8s-community",
      description:
        "Advanced Kubernetes dashboard with real-time monitoring and management",
      stars: 2150,
      forks: 450,
      language: "React",
      avatar: "https://github.com/identicons/k8s-community.png",
      link: "/projects/kubernetes-dashboard-pro",
      featured: true,
      tags: ["kubernetes", "react", "monitoring"],
    },
    {
      name: "ai-text-classifier",
      author: "ml-innovations",
      description:
        "State-of-the-art text classification using transformer models",
      stars: 1840,
      forks: 320,
      language: "Python",
      avatar: "https://github.com/identicons/ml-innovations.png",
      link: "/projects/ai-text-classifier",
      featured: true,
      tags: ["machine-learning", "nlp", "pytorch"],
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: FiGlobe },
    { value: "web", label: "Web Development", icon: FiCode },
    { value: "mobile", label: "Mobile Apps", icon: FiLayers },
    { value: "ai", label: "AI & Machine Learning", icon: FiZap },
    { value: "devops", label: "DevOps & Infrastructure", icon: FiGitBranch },
    { value: "data", label: "Data Science", icon: FiTrendingUp },
  ];

  const popularTags = [
    { name: "react", count: 1240, trend: "+18%", color: "blue" },
    { name: "kubernetes", count: 890, trend: "+25%", color: "cyan" },
    { name: "python", count: 1580, trend: "+12%", color: "green" },
    { name: "typescript", count: 950, trend: "+20%", color: "indigo" },
    { name: "machine-learning", count: 720, trend: "+35%", color: "purple" },
    { name: "docker", count: 650, trend: "+15%", color: "orange" },
    { name: "nextjs", count: 580, trend: "+28%", color: "gray" },
    { name: "devops", count: 490, trend: "+22%", color: "red" },
  ];

  const topDevelopers = [
    {
      name: "Sarah Chen",
      username: "sarah-fullstack",
      bio: "Full-stack engineer building scalable web applications",
      followers: 2340,
      projects: 45,
      avatar: "https://github.com/identicons/sarah-fullstack.png",
      tags: ["React", "Node.js", "AWS"],
      link: "/users/sarah-fullstack",
    },
    {
      name: "Alex Thompson",
      username: "alex-devops",
      bio: "DevOps architect specializing in Kubernetes and cloud infrastructure",
      followers: 1890,
      projects: 32,
      avatar: "https://github.com/identicons/alex-devops.png",
      tags: ["Kubernetes", "AWS", "Terraform"],
      link: "/users/alex-devops",
    },
    {
      name: "Maya Patel",
      username: "maya-ai",
      bio: "AI researcher focusing on computer vision and NLP applications",
      followers: 3120,
      projects: 28,
      avatar: "https://github.com/identicons/maya-ai.png",
      tags: ["PyTorch", "TensorFlow", "Python"],
      link: "/users/maya-ai",
    },
  ];

  const recentlyActiveProjects = [
    {
      name: "chat-app-realtime",
      author: "realtime-dev",
      description: "Real-time chat application with WebSocket support",
      stars: 456,
      language: "JavaScript",
      avatar: "https://github.com/identicons/realtime-dev.png",
      lastCommit: "2 hours ago",
      activity: "high",
      link: "/projects/chat-app-realtime",
    },
    {
      name: "blog-cms-headless",
      author: "cms-builders",
      description: "Headless CMS for modern blog websites",
      stars: 623,
      language: "TypeScript",
      avatar: "https://github.com/identicons/cms-builders.png",
      lastCommit: "4 hours ago",
      activity: "high",
      link: "/projects/blog-cms-headless",
    },
    {
      name: "expense-tracker-mobile",
      author: "mobile-team",
      description: "Cross-platform expense tracking mobile application",
      stars: 234,
      language: "React Native",
      avatar: "https://github.com/identicons/mobile-team.png",
      lastCommit: "6 hours ago",
      activity: "medium",
      link: "/projects/expense-tracker-mobile",
    },
  ];

  const renderFeaturedProject = (project: any) => (
    <Card key={project.name} p="lg" radius="lg" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Badge variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
            Featured
          </Badge>
          <Group gap="xs">
            <FiStar size={14} color="#6c757d" />
            <Text size="sm" c="dimmed">
              {project.stars}
            </Text>
          </Group>
        </Group>

        <Group>
          <Avatar src={project.avatar} size="md" radius="md" />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Anchor
              component={Link}
              to={project.link}
              size="lg"
              fw={600}
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              {project.name}
            </Anchor>
            <Text size="sm" c="dimmed">
              by {project.author}
            </Text>
          </Stack>
        </Group>

        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          {project.description}
        </Text>

        <Group justify="space-between" align="center">
          <Group gap="xs">
            {project.tags.slice(0, 3).map((tag: string) => (
              <Badge
                key={tag}
                size="xs"
                variant="light"
                component={Link}
                to={`/tags/${tag}`}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                {tag}
              </Badge>
            ))}
          </Group>
          <Group gap="sm">
            <Badge variant="light" color="gray">
              {project.language}
            </Badge>
            <Group gap={4}>
              <FiGitBranch size={12} color="#6c757d" />
              <Text size="xs" c="dimmed">
                {project.forks}
              </Text>
            </Group>
          </Group>
        </Group>
      </Stack>
    </Card>
  );

  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        {/* Header Section */}
        <Stack gap="lg">
          <Stack gap="xs">
            <Title order={1}>Explore CraneCloud</Title>
            <Text size="lg" c="dimmed">
              Discover trending projects, talented developers, and popular
              technologies in the community
            </Text>
          </Stack>
          {/* Search and Filters */}
          <Card p="lg" radius="lg" withBorder>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Search projects, users, or tags..."
                  leftSection={<FiSearch size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  placeholder="Category"
                  data={categories.map((cat) => ({
                    value: cat.value,
                    label: cat.label,
                  }))}
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value || "all")}
                  leftSection={<FiFilter size={16} />}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  placeholder="Sort by"
                  data={[
                    { value: "trending", label: "Trending" },
                    { value: "stars", label: "Most Stars" },
                    { value: "recent", label: "Recently Updated" },
                    { value: "newest", label: "Newest" },
                  ]}
                  value={sortBy}
                  onChange={(value) => setSortBy(value || "trending")}
                  leftSection={<FiTrendingUp size={16} />}
                  size="sm"
                />
              </Grid.Col>
            </Grid>
          </Card>
        </Stack>

        <Tabs defaultValue="overview">
          <Tabs.List mb="xl">
            <Tabs.Tab value="overview" leftSection={<FiGlobe size={16} />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
              Projects
            </Tabs.Tab>
            <Tabs.Tab value="developers" leftSection={<FiUsers size={16} />}>
              Developers
            </Tabs.Tab>
            <Tabs.Tab value="tags" leftSection={<FiTag size={16} />}>
              Tags
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <Grid>
              {/* Featured Projects */}
              <Grid.Col span={12}>
                <Title order={2} mb="lg">
                  🌟 Featured Projects
                </Title>
                <SimpleGrid
                  cols={{ base: 1, md: 2, lg: 3 }}
                  spacing="lg"
                  mb="xl"
                >
                  {featuredProjects.map(renderFeaturedProject)}
                </SimpleGrid>
              </Grid.Col>

              {/* Three Column Layout */}
              <Grid.Col span={4}>
                <Stack gap="lg">
                  <TrendingProjects compact />
                  <Card p="md" withBorder radius="lg">
                    <Group mb="sm">
                      <FiCalendar size={18} />
                      <Title order={4} size="md">
                        Recently Active
                      </Title>
                    </Group>
                    <Stack gap="sm">
                      {recentlyActiveProjects.map((project, index) => (
                        <div key={project.name}>
                          <Group gap="xs">
                            <Avatar src={project.avatar} size="xs" />
                            <div style={{ flex: 1 }}>
                              <Text size="sm" fw={500}>
                                {project.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {project.lastCommit}
                              </Text>
                            </div>
                            <Badge
                              size="xs"
                              color={
                                project.activity === "high" ? "green" : "orange"
                              }
                            >
                              {project.activity}
                            </Badge>
                          </Group>
                          {index < recentlyActiveProjects.length - 1 && (
                            <Divider my="sm" color="gray.3" />
                          )}
                        </div>
                      ))}
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={4}>
                <SuggestedUsers users={topDevelopers} title="Top Developers" />
              </Grid.Col>

              <Grid.Col span={4}>
                <Stack gap="lg">
                  <Card p="md" withBorder radius="lg">
                    <Group mb="sm">
                      <FiTag size={18} />
                      <Title order={4} size="md">
                        Popular Tags
                      </Title>
                    </Group>
                    <Stack gap="xs">
                      {popularTags.map((tag) => (
                        <Group key={tag.name} justify="space-between">
                          <Group gap="xs">
                            <Badge
                              variant="light"
                              color={tag.color}
                              component={Link}
                              to={`/tags/${tag.name}`}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              #{tag.name}
                            </Badge>
                            <Text size="xs" c="dimmed">
                              {tag.count} projects
                            </Text>
                          </Group>
                          <Text size="xs" c="green" fw={500}>
                            {tag.trend}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Card>

                  <Card p="md" withBorder radius="lg">
                    <Group mb="sm">
                      <FiTrendingUp size={18} />
                      <Title order={4} size="md">
                        Quick Stats
                      </Title>
                    </Group>
                    <SimpleGrid cols={2} spacing="sm">
                      <Paper p="sm" bg="blue.0" radius="md">
                        <Text size="lg" fw={700} c="blue">
                          2.4K
                        </Text>
                        <Text size="xs" c="dimmed">
                          Active Projects
                        </Text>
                      </Paper>
                      <Paper p="sm" bg="green.0" radius="md">
                        <Text size="lg" fw={700} c="green">
                          890
                        </Text>
                        <Text size="xs" c="dimmed">
                          Developers
                        </Text>
                      </Paper>
                      <Paper p="sm" bg="orange.0" radius="md">
                        <Text size="lg" fw={700} c="gray">
                          1.2M
                        </Text>
                        <Text size="xs" c="dimmed">
                          Lines of Code
                        </Text>
                      </Paper>
                      <Paper p="sm" bg="orange.0" radius="md">
                        <Text size="lg" fw={700} c="orange">
                          45K
                        </Text>
                        <Text size="xs" c="dimmed">
                          Deployments
                        </Text>
                      </Paper>
                    </SimpleGrid>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="projects">
            <Grid>
              <Grid.Col span={8}>
                <Title order={3} mb="lg">
                  All Projects
                </Title>
                <Stack gap="md">
                  {[...featuredProjects, ...recentlyActiveProjects].map(
                    (project, index) => (
                      <Card
                        key={`${project.name}-${index}`}
                        p="md"
                        withBorder
                        radius="lg"
                      >
                        <Group justify="space-between" mb="sm">
                          <Group>
                            <Avatar src={project.avatar} size="sm" />
                            <div>
                              <Anchor
                                component={Link}
                                to={project.link || "#"}
                                fw={600}
                                style={{ textDecoration: "none" }}
                              >
                                {project.name}
                              </Anchor>
                              <Text size="xs" c="dimmed">
                                by {project.author}
                              </Text>
                            </div>
                          </Group>
                          <Group gap="sm">
                            <Group gap={4}>
                              <FiStar size={12} color="#6c757d" />
                              <Text size="xs" c="dimmed">
                                {project.stars}
                              </Text>
                            </Group>
                            <Badge size="xs" variant="light">
                              {project.language}
                            </Badge>
                          </Group>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {project.description}
                        </Text>
                      </Card>
                    ),
                  )}
                </Stack>
              </Grid.Col>
              <Grid.Col span={4}>
                <TrendingTags />
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="developers">
            <Title order={3} mb="lg">
              Community Developers
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {[...topDevelopers, ...topDevelopers].map((user, index) => (
                <Card
                  key={`${user.username}-${index}`}
                  p="lg"
                  withBorder
                  radius="lg"
                >
                  <Group mb="md">
                    <Avatar src={user.avatar} size="lg" />
                    <div style={{ flex: 1 }}>
                      <Anchor
                        component={Link}
                        to={user.link}
                        size="lg"
                        fw={600}
                        style={{ textDecoration: "none" }}
                      >
                        {user.name}
                      </Anchor>
                      <Text size="sm" c="dimmed">
                        @{user.username}
                      </Text>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    {user.bio}
                  </Text>
                  <Group gap="xs" mb="md">
                    {user.tags.map((tag) => (
                      <Badge key={tag} size="xs" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                  <Group gap="lg">
                    <Text size="sm" c="dimmed">
                      {user.followers} followers
                    </Text>
                    <Text size="sm" c="dimmed">
                      {user.projects} projects
                    </Text>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="tags">
            <Title order={3} mb="lg">
              Explore by Technology
            </Title>
            <Grid>
              <Grid.Col span={8}>
                <SimpleGrid cols={4} spacing="md">
                  {popularTags.map((tag) => (
                    <Card
                      key={tag.name}
                      p="lg"
                      withBorder
                      radius="lg"
                      ta="center"
                      component={Link}
                      to={`/tags/${tag.name}`}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s ease",
                      }}
                      className="hover:shadow-md"
                    >
                      <ThemeIcon
                        size="xl"
                        variant="light"
                        color={tag.color}
                        mx="auto"
                        mb="md"
                      >
                        <FiTag size={24} />
                      </ThemeIcon>
                      <Title order={4} mb="xs">
                        {tag.name}
                      </Title>
                      <Text size="sm" c="dimmed" mb="xs">
                        {tag.count} projects
                      </Text>
                      <Text size="xs" c="green" fw={500}>
                        {tag.trend}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Grid.Col>
              <Grid.Col span={4}>
                <Card p="md" withBorder radius="lg">
                  <Title order={4} mb="md">
                    Category Distribution
                  </Title>
                  <Stack gap="sm">
                    {categories.slice(1).map((category) => (
                      <Group key={category.value} justify="space-between">
                        <Group gap="xs">
                          <category.icon size={16} />
                          <Text size="sm">{category.label}</Text>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {Math.floor(Math.random() * 500) + 100} projects
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default ExplorePage;
