import React, { useState, useEffect, useRef } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box,
  Paper,
  Typography,
  Chip,
  Avatar as MuiAvatar,
  Fade,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './App.css';
import Avatar from './components/Avatar';
import { getRandomCity } from './citiesData';

// Custom MUI theme with new color palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#606c38',
      light: '#8b9568',
      dark: '#283618',
    },
    secondary: {
      main: '#dda15e',
      light: '#e8c088',
      dark: '#bc6c25',
    },
    background: {
      default: 'linear-gradient(135deg, #283618 0%, #606c38 50%, #8b9568 100%)',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
  },
  shape: {
    borderRadius: 20,
  },
});

// Styled components
const StyledChatContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  height: '100vh',
  maxHeight: '1000px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 0,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    maxHeight: '100vh',
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #283618 0%, #606c38 100%)',
  color: 'white',
  padding: 0,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
  position: 'relative',
  zIndex: 10,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
  },
}));

const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '24px 28px',
});

const HeaderIcon = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
});

const StatusIndicator = styled(Box)({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#dda15e',
  boxShadow: '0 0 0 2px rgba(221, 161, 94, 0.3), 0 0 8px rgba(221, 161, 94, 0.5)',
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
  },
});

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  background: 'linear-gradient(to bottom, #fefae0 0%, #f5f0d8 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%)',
    zIndex: 1,
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    transition: 'background 0.2s',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  },
}));

const MessagesWrapper = styled(Stack)(({ theme }) => ({
  padding: '32px 28px',
  gap: '20px',
  minHeight: '100%',
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px',
    gap: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 16px',
    gap: '14px',
  },
}));

const MessageWrapper = styled(Box)(({ theme, align }) => ({
  display: 'flex',
  justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
  animation: 'messageSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards',
  '@keyframes messageSlideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px) scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
}));

const MessageContent = styled(Box)(({ theme, align }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '12px',
  maxWidth: '75%',
  position: 'relative',
  flexDirection: align === 'left' ? 'row' : 'row-reverse',
  [theme.breakpoints.down('md')]: {
    maxWidth: '85%',
    gap: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
    gap: '8px',
  },
}));

const MessageBubbleWrapper = styled(Box)(({ theme, align }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: align === 'left' ? 'flex-start' : 'flex-end',
}));

const MessageBubble = styled(Chip)(({ theme, isAlice }) => ({
  padding: '14px 18px',
  height: 'auto',
  borderRadius: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
  border: isAlice 
    ? '1px solid rgba(96, 108, 56, 0.15)' 
    : '1px solid rgba(255, 255, 255, 0.2)',
  background: isAlice
    ? 'linear-gradient(135deg, #fefae0 0%, #f5f0d8 100%)'
    : 'linear-gradient(135deg, #dda15e 0%, #bc6c25 100%)',
  color: isAlice ? '#283618' : '#ffffff',
  borderBottomLeftRadius: isAlice ? '6px' : '20px',
  borderBottomRightRadius: isAlice ? '20px' : '6px',
  '& .MuiChip-label': {
    padding: 0,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '-0.2px',
    textShadow: isAlice ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '12px 16px',
    borderRadius: '18px',
    '& .MuiChip-label': {
      fontSize: '15px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 14px',
    borderRadius: '16px',
    '& .MuiChip-label': {
      fontSize: '14px',
    },
  },
}));

const SenderName = styled(Typography)(({ theme, isAlice }) => ({
  fontSize: '12px',
  fontWeight: 600,
  color: isAlice ? '#606c38' : '#bc6c25',
  padding: '0 4px 2px 4px',
  letterSpacing: '0.3px',
  textTransform: 'capitalize',
}));

const MessageTime = styled(Typography)(({ theme, isAlice }) => ({
  fontSize: '11px',
  color: isAlice ? '#606c38' : 'rgba(255, 255, 255, 0.8)',
  fontWeight: 400,
  padding: '0 4px',
  opacity: 0.7,
  letterSpacing: '0.2px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
  },
}));

const TypingBubble = styled(Box)(({ theme, isAlice }) => ({
  background: isAlice
    ? 'linear-gradient(135deg, #fefae0 0%, #f5f0d8 100%)'
    : 'linear-gradient(135deg, #dda15e 0%, #bc6c25 100%)',
  padding: '14px 18px',
  borderRadius: '20px',
  borderBottomLeftRadius: isAlice ? '6px' : '20px',
  borderBottomRightRadius: isAlice ? '20px' : '6px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  border: isAlice
    ? '1px solid rgba(96, 108, 56, 0.15)'
    : '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('md')]: {
    padding: '12px 16px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 14px',
  },
}));

const TypingText = styled(Typography)(({ theme, isAlice }) => ({
  fontSize: '13px',
  color: isAlice ? '#606c38' : 'rgba(255, 255, 255, 0.9)',
  fontWeight: 400,
  fontStyle: 'italic',
  letterSpacing: '0.2px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

const TypingDots = styled(Box)(({ theme, isAlice }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  paddingTop: '2px',
  '& span': {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: isAlice ? '#606c38' : 'rgba(255, 255, 255, 0.8)',
    animation: 'typingDot 1.4s infinite ease-in-out',
    display: 'block',
    '&:nth-child(1)': {
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.4s',
    },
    '@keyframes typingDot': {
      '0%, 60%, 100%': {
        transform: 'translateY(0) scale(1)',
        opacity: 0.5,
      },
      '30%': {
        transform: 'translateY(-6px) scale(1.1)',
        opacity: 1,
      },
    },
  },
}));

const BackgroundPattern = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.03,
  backgroundImage: `
    radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, white 1px, transparent 1px),
    radial-gradient(circle at 40% 20%, white 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px, 80px 80px, 60px 60px',
  pointerEvents: 'none',
});

function App() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const messagesEndRef = useRef(null);
  const conversationStarted = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (conversationStarted.current) return;
    conversationStarted.current = true;

    const startConversation = () => {
      const firstCity = getRandomCity([]);
      setMessages([{ sender: 'Alice', text: firstCity, id: Date.now() }]);
      setRecentCities([firstCity]);
      
      setTimeout(() => {
        sendNextMessage('Bob', [firstCity]);
      }, 3000 + Math.random() * 2000);
    };

    startConversation();
  }, []);

  const sendNextMessage = (sender, currentRecentCities) => {
    setTyping(sender);
    
    const delay = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      const city = getRandomCity(currentRecentCities);
      const updatedRecentCities = [...currentRecentCities, city].slice(-5);
      setRecentCities(updatedRecentCities);
      
      setMessages(prev => [...prev, { 
        sender, 
        text: city, 
        id: Date.now() 
      }]);
      
      setTyping(null);
      
      const nextSender = sender === 'Alice' ? 'Bob' : 'Alice';
      
      setTimeout(() => {
        sendNextMessage(nextSender, updatedRecentCities);
      }, 3000 + Math.random() * 2000);
    }, delay);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #283618 0%, #606c38 50%, #8b9568 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        <BackgroundPattern />
        <StyledChatContainer>
          <StyledHeader>
            <HeaderContent>
              <HeaderIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </HeaderIcon>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h1"
                  sx={{
                    margin: 0,
                    marginBottom: '4px',
                    fontSize: { xs: '18px', sm: '20px', md: '24px' },
                    background: 'linear-gradient(135deg, #ffffff 0%, #fefae0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.2,
                  }}
                >
                  Cities Game
                </Typography>
                <Typography
                  sx={{
                    margin: 0,
                    fontSize: { xs: '12px', sm: '13px' },
                    opacity: 0.75,
                    fontWeight: 400,
                    letterSpacing: '0.3px',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  Alice & Bob are playing
                </Typography>
              </Box>
            </HeaderContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 28px 20px 28px', fontSize: '12px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <StatusIndicator />
              <Typography component="span" sx={{ fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Live
              </Typography>
            </Box>
          </StyledHeader>
          
          <MessagesContainer>
            <MessagesWrapper>
              {messages.map((message, index) => {
                const isAlice = message.sender === 'Alice';
                return (
                  <Fade in key={message.id} timeout={500} style={{ transitionDelay: `${index * 50}ms` }}>
                    <MessageWrapper align={isAlice ? 'left' : 'right'}>
                      <MessageContent align={isAlice ? 'left' : 'right'}>
                        <Avatar name={message.sender} size={44} />
                        <MessageBubbleWrapper align={isAlice ? 'left' : 'right'}>
                          <SenderName isAlice={isAlice}>{message.sender}</SenderName>
                          <MessageBubble
                            label={message.text}
                            isAlice={isAlice}
                          />
                          <MessageTime isAlice={isAlice}>
                            {new Date(message.id).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: false 
                            })}
                          </MessageTime>
                        </MessageBubbleWrapper>
                      </MessageContent>
                    </MessageWrapper>
                  </Fade>
                );
              })}
              
              {typing && (
                <MessageWrapper align={typing === 'Alice' ? 'left' : 'right'}>
                  <MessageContent align={typing === 'Alice' ? 'left' : 'right'}>
                    <Avatar name={typing} size={44} />
                    <MessageBubbleWrapper align={typing === 'Alice' ? 'left' : 'right'}>
                      <SenderName isAlice={typing === 'Alice'}>{typing}</SenderName>
                      <TypingBubble isAlice={typing === 'Alice'}>
                        <TypingText isAlice={typing === 'Alice'}>{typing} is typing</TypingText>
                        <TypingDots isAlice={typing === 'Alice'}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </TypingDots>
                      </TypingBubble>
                    </MessageBubbleWrapper>
                  </MessageContent>
                </MessageWrapper>
              )}
              
              <Box ref={messagesEndRef} sx={{ height: '1px' }} />
            </MessagesWrapper>
          </MessagesContainer>
        </StyledChatContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
