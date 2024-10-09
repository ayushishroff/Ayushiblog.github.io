// Blog data (hardcoded)
const blogs = [
  {
    id: 1,
    title: "Sample Blog Title 1",
    content: "This is the content of blog post number 1.",
    date: "2024-10-09"
  },
  {
    id: 2,
    title: "Another Blog Title 2",
    content: "Content for blog post number 2.",
    date: "2024-10-08"
  },
  {
    id: 3,
    title: "Yet Another Blog Title 3",
    content: "Content for blog post number 3.",
    date: "2024-10-07"
  }
];

// DOM Elements
const mainContent = document.getElementById('main-content');
const searchInput = document.getElementById('search');

// Function to render all blog posts
function renderBlogs(filteredBlogs) {
  // Clear previous content
  const blogContainer = document.getElementById('blog-container');
  blogContainer.innerHTML = '';

  if (filteredBlogs.length > 0) {
    filteredBlogs.forEach(blog => {
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');

      blogPost.innerHTML = `
        <h2><a href="#" onclick="openBlogInNewPage(${blog.id})" target="_blank">${blog.title}</a></h2>
        <p>${blog.content.substring(0, 100)}...</p>
        <small>${blog.date}</small>
      `;

      blogContainer.appendChild(blogPost);
    });
  } else {
    blogContainer.innerHTML = `<p>No blogs found matching your search.</p>`;
  }
}

// Function to open blog content in a new page
function openBlogInNewPage(blogId) {
  const blog = blogs.find(b => b.id === blogId);
  if (blog) {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>${blog.title}</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <div class="container">
            <div class="main-content">
              <h2>${blog.title}</h2>
              <p>${blog.content}</p>
              <small>${blog.date}</small>
              <br><br>
              <a href="#" onclick="window.close()">← Close</a>
            </div>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}

// Search functionality
searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase();
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(query) || 
    blog.content.toLowerCase().includes(query)
  );
  renderBlogs(filteredBlogs);
});

// Initial render (homepage)
renderBlogs(blogs);
