import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CodeEditor from "../CodeEditor/CodeEditor";
import WhiteBoardContainer from "../Whiteboard/WhiteBoardContainer";
import Files from "../Files/Files";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="MeetingTabspage" sx={{ width: "100%" }}>
      <Box>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Code Editor" />
          <AntTab label="White Board" />
          {/* <AntTab label="Share Screen" /> */}
          <AntTab label="Files" />
          <AntTab label="Chat" />
        </AntTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CodeEditor documentId={props.meetingId} meetingId={props.meetingId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WhiteBoardContainer
          documentId={props.meetingId}
          meetingId={props.meetingId}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Files meetingId={props.meetingId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Chat
      </TabPanel>
    </Box>
  );
}
