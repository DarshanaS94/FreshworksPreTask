async function fetchData() {
    try {
        // Fetch posts and users.json
        const [postsResponse, usersResponse] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("users.json")
        ]);

        if (!postsResponse.ok || !usersResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const posts = await postsResponse.json();
        const users = await usersResponse.json();

        const userIds = Object.keys(users);

        console.log("Fetched Users:", users);

        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = "";

        for (let i = 0; i < 10; i++) { 
            const post = posts[i];
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
            const comments = await commentsResponse.json();

            // Ensure each post gets a different user
            const userIdIndex = i % userIds.length; 
            const userId = userIds[userIdIndex]; 
            const userName = users[userId]; 

            const avatarUrl = `https://picsum.photos/seed/${userId}/50`;

            console.log(`Post ID: ${post.id} | Assigned User: ${userName}`);

            // Create post element
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="user-info">
                    <img src="${avatarUrl}" alt="User Avatar">
                    <strong>${userName}</strong>
                </div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <div class="comments">
                    <h4>Comments:</h4>
                    ${comments.map(comment => `<div class="comment">${comment.body}</div>`).join('') || '<p>No comments yet.</p>'}
                </div>
            `;
            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();