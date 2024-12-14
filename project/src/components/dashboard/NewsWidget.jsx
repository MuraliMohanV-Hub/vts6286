import React from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Link
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/api';

const NewsWidget = ({ market }) => {
  const { data: news, isLoading } = useQuery({
    queryKey: ['news', market],
    queryFn: () => stockService.getNews(market)
  });

  if (isLoading) return <div>Loading news...</div>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Market News
      </Typography>
      <List>
        {news?.data?.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={
                <Link href={item.url} target="_blank" rel="noopener">
                  {item.title}
                </Link>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    {item.date} - 
                  </Typography>
                  {" " + item.summary}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NewsWidget;