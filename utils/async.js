setTimeout(() => console.log('Zero Second Later'), 0);
console.log('Starting');
console.log('Stopping');
setTimeout(() => {
    console.log('2 Secs Later');
}, 2000);