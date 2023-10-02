import styles from '../../assets/styles/module.css/Blogs.module.css';

const BlogView = () => {
  return (
    <section id={styles.Blog}>
    <div id={styles.Blogview}>
      <h4>A preview of RSO Website</h4>
      <iframe src="https://www.rwandascout.org/" title="Rwanda Scout Blog"></iframe>
    </div>
    </section>
  );
}

export default BlogView;
