import styles from '../../assets/styles/module.css/Blogs.module.css';
const AddBlog = () => {
  return (
    <section id={styles.Blog}>
    <div id={styles.Addblog}>
      <h4>
        Add content to the website
        <a href=''> Link </a>
      </h4>
      <iframe src="https://www.rwandascout.org/" title="Rwanda Scout Blog"></iframe>
      
    </div>
    </section>
  );
}

export default AddBlog;
