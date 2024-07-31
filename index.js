const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Paddle and ball dimensions
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

// Paddle positions
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

// Ball position and velocity
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Player scores
let player1Score = 0;
let player2Score = 0;

// Control paddles with mouse
canvas.addEventListener('mousemove', (evt) => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    paddle1Y = mouseY - paddleHeight / 2;
});

function drawEverything() {
    // Clear the canvas
    context.fillStyle = '#9370DB'; // Light purple
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#FFFFFF'; // White
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    context.fillStyle = '#FFFFFF'; // White
    context.fill();

    // Draw net
    for (let i = 0; i < canvas.height; i += 40) {
        context.fillRect(canvas.width / 2 - 1, i, 2, 20);
    }

    // Draw scores
    context.font = '30px Arial';
    context.fillText(player1Score, canvas.width / 4, 50);
    context.fillText(player2Score, 3 * canvas.width / 4, 50);
}

function moveEverything() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballReset();
        }
    }
    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }

    // AI paddle movement
    if (paddle2Y + paddleHeight / 2 < ballY) {
        paddle2Y += 6;
    } else {
        paddle2Y -= 6;
    }
}

function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    moveEverything();
    drawEverything();
}

setInterval(gameLoop, 1000 / 60); // 60 frames per second