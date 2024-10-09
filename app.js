// Blog data (hardcoded)
const blogs = [
  {
    id: 1,
    title: "123322212333333333333333333",
    content: "BRFSJDAKHKADHKAJSHDJKASHDKJASHD",
    date: "syadfu"
  },
  {
    id: 2,
    title: "nopeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    content: "bruh.",
    date: "Owwwwwwww"
  },
  {
    id: 3,
    title: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    content: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.",
    date: ""
  }
];

// DOM Elements
const mainContent = document.getElementById('main-content');
const searchInput = document.getElementById('search');

// Function to render all blog posts
function renderBlogs(filteredBlogs) {
  const blogContainer = document.createElement('div');
  blogContainer.id = 'blog-container';
  blogContainer.className = 'blog-container';

  if (filteredBlogs.length > 0) {
    // Loop through blogs and add them to the DOM
    filteredBlogs.forEach(blog => {
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');

      // Create blog title as a link
      blogPost.innerHTML = `
        <h2><a href="#" onclick="navigateToBlog(${blog.id})">${blog.title}</a></h2>
        <p>${blog.content.substring(0, 100)}...</p>
        <small>${blog.date}</small>
      `;

      blogContainer.appendChild(blogPost);
    });
  } else {
    blogContainer.innerHTML = `<p>No blogs found matching your search.</p>`;
  }

  // Append blogContainer to main content
  mainContent.appendChild(blogContainer);
}

// Function to render individual blog post by ID
function renderBlogPost(blog) {
  mainContent.innerHTML = `
    <h2>${blog.title}</h2>
    <p>${blog.content}</p>
    <small>${blog.date}</small>
    <br><br>
    <a href="#" onclick="navigateToHome()">← Back to home</a>
  `;
}

// Navigation to specific blog page
function navigateToBlog(blogId) {
  const blog = blogs.find(b => b.id === blogId);
  if (blog) {
    // Change the URL without reloading the page
    history.pushState({ blogId }, blog.title, `/blog/${blogId}`);
    renderBlogPost(blog);
  }
}

// Navigate back to home (main blog list)
function navigateToHome() {
  history.pushState({}, 'Home', '/');
  mainContent.innerHTML = `<h1>Welcome to My Blog!</h1>`;

  // Re-render the blogs list after returning to home
  renderBlogs(blogs);
}

// Search functionality
searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase();

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(query) || 
    blog.content.toLowerCase().includes(query)
  );

  // Clear the main content before re-rendering
  mainContent.innerHTML = `<h1>Welcome to My Blog!</h1>`;
  
  // Re-render filtered blogs
  renderBlogs(filteredBlogs);
});

// Handle browser back/forward navigation
window.onpopstate = function(event) {
  if (event.state && event.state.blogId) {
    const blog = blogs.find(b => b.id === event.state.blogId);
    renderBlogPost(blog);
  } else {
    navigateToHome();
  }
};

// Initial render (homepage)
navigateToHome();
