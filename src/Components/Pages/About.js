/**
 * About component describing the website and containing couple of words about me, the author :)
 */
const About = () => {
    return (
        <div>
            
            <h1> ABOUT </h1>
            <div style = {{marginLeft: '10%', marginRight: '10%', textAlign:'justify'}}>
                <p>
                    Hello, my name is Kamil Świątek and I am an author of this website, you can find link to my GitHub repos in the footer, down below.
                    This website is supposed to be notice board that You sometimes see in the cities, but on the internet. Users can announce everything 
                    they want, provided they add address of the place their announcement is tied to, select type of announcement and fill in title and 
                    description. Then other users can browse announcements and filter them by phrases in titles or descriptions and by type of announcement.
                    To see details of various announcements one have to first sign up on the website and then sign in using their credentials. After that
                    DETAILS button becomes visible and user can view them. 
                </p><p>
                    This website was created to practise my ReactJS and Java Spring boot skills. It was done noncommercially and in my free time.
                </p><p>
                    You can find my other projects here {'->'} <a href='https://github.com/camillo29'>GITHUB</a>
                </p>
            </div>
        </div>
    );
}


export default About;