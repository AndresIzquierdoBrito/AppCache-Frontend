import { Button, ButtonProps } from '@mantine/core';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@mantinex/dev-icons';

import { GoogleIcon } from './GoogleIcon';
import classes from './SocialButtons.module.css';

export function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) {
  return <Button leftSection={<GoogleIcon />} variant="default" {...props} />;
}

export function DiscordButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) {
  return (
    <Button
      className={classes.discordButton}
      leftSection={<DiscordIcon style={{ width: '1rem', height: '1rem' }} />}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Button
      component="a"
      leftSection={
        <TwitterIcon style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />
      }
      variant="default"
      {...props}
    />
  );
}

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) {
  return (
    <Button
      {...props}
      leftSection={<GithubIcon style={{ width: '1rem', height: '1rem' }} />}
      className={classes.githubButton}
    />
  );
}
