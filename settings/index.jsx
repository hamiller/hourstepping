function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Color Settings</Text>}>
        <ColorSelect
          settingsKey="colorTime"
          colors={[
              {color: "#cba258"},
              {color: "#ff007f"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);
