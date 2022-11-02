import { Container, Link, Pagination, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "http://hn.algolia.com/api/v1/search?";

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(({ data }) => {
      setPosts(data.hits);
      setPageQty(data.nbPages);

      if(data.nbPages < page) {
        setPage(1)
      }
    });
  }, [query, page]);

  return (
    <Container sx={{ marginTop: 5 }}>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Stack spacing={2}>
        {posts.map((post) => {
          return (
            <Link key={post.objectID} href={post.url}>
              {post.title || post.story_title}
            </Link>
          );
        })}

        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            showFirstButton
            showLastButton
            onChange={(_, num) => setPage(num)}
            sx={{marginTop: 3, marginX: 'auto'}}
          />
        )}
      </Stack>
    </Container>
  );
}

export default App;
