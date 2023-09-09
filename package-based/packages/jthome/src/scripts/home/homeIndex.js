fetch("/img/eye/eye.webp")
	.then(res => res.blob())
	.then(imgData => console.log(imgData));
