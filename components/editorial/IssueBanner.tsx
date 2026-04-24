/**
 * IssueBanner — thin sage strip that sits just below the masthead.
 * Sets the "this is a published issue" frame.
 */
export function IssueBanner() {
  return (
    <div className="issue-banner" role="complementary" aria-label="Issue">
      <div className="issue-banner__inner">
        <span className="issue-banner__mark" aria-hidden />
        <span>Issue No. 01</span>
        <span aria-hidden className="issue-banner__dot" />
        <span>The Launch Edition</span>
        <span aria-hidden className="issue-banner__dot" />
        <span>Opens with 12 Investigations</span>
      </div>
    </div>
  );
}
