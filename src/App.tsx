import { useState } from "react";
import { Box, ThemeProvider } from "@primer/react";
import { OptionsProps, markdownBadges } from "./utils/markdownBadges";
import { MultiValue } from "react-select";
import { AboutMe } from "./components/AboutMe";
import { getMarkdown } from "./utils/getMarkdown";
import { TechStack } from "./components/TechStack";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { GithubStats } from "./components/GithubStats";
import { ContactMe, SocialMediaProps } from "./components/ContactMe";
import { useAboutMeHandler } from "./hooks/useAboutMeHandler";
import { useInputHandler } from "./hooks/useInputHandler";

function App() {
  const { inputs: aboutMeInputs, ...aboutMeInputHandlers } = useAboutMeHandler({
    text: "",
    emoji: "😃",
  });

  const [selectedTechs, setSelectedTechs] = useState<MultiValue<OptionsProps>>(
    []
  );

  const [githubUser, setGithubUser] = useState<string>("");

  const { inputs: contactMeInputs, ...contactMeInputHandlers } =
    useInputHandler<SocialMediaProps>({ url: "" });

  const markdown = getMarkdown(
    aboutMeInputs,
    selectedTechs,
    githubUser,
    contactMeInputs
  );

  const copyToClipboard = () => navigator.clipboard.writeText(markdown);

  return (
    <ThemeProvider>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRight: "1px solid gray",
            minWidth: 500,
          }}
        >
          <AboutMe inputs={aboutMeInputs} {...aboutMeInputHandlers} />
          <TechStack
            selectedTechs={selectedTechs}
            onChangeTechs={(badges) => setSelectedTechs(badges)}
            techOptions={markdownBadges}
          />
          <GithubStats
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
          />
          <ContactMe inputs={contactMeInputs} {...contactMeInputHandlers} />
        </Box>
        <MarkdownPreview onCopy={() => copyToClipboard()} markdown={markdown} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
