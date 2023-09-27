export default  function changeLink(suffLink,link)
     {
    const currentUrl = new URL(window.location.href);

    // Update the sorting parameter
    currentUrl.searchParams.set(suffLink, link);

    // Set the updated URL
    window.location.href = currentUrl.toString();
  };