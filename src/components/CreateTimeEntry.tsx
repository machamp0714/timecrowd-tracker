import { Form, showToast, Toast, ActionPanel, Action, useNavigation } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";
import { useCategories } from "@/hooks";
import { createTimeEntry, type Category } from "@/api";

interface TimeEntryForm {
  title: string;
  category: string;
}

interface CreateTimeEntryProps {
  revalidateUser: () => void;
  revalidateDailyActivities: () => void;
}

export const CreateTimeEntry = ({ revalidateUser, revalidateDailyActivities }: CreateTimeEntryProps) => {
  const { pop } = useNavigation();
  const { categories, isLoadingCategories } = useCategories();

  const { handleSubmit, itemProps } = useForm<TimeEntryForm>({
    async onSubmit(values) {
      const category = categories?.find((category) => category.id.toString() === values.category) as Category;

      const params = {
        task: {
          title: values.title,
          key: values.title,
          parent_id: category.id,
          team_id: category.team.id,
        },
      };
      try {
        await createTimeEntry(params);
        revalidateUser();
        revalidateDailyActivities();
        showToast(Toast.Style.Success, `Started Time Entry`);
        pop();
      } catch (error) {
        showToast(Toast.Style.Failure, "Failed to create Time Entry");
      }
    },
    validation: {
      title: FormValidation.Required,
    },
  });

  return (
    <Form
      isLoading={isLoadingCategories}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="title" {...itemProps.title} />
      <Form.Dropdown title="category" defaultValue={categories?.[0].id.toString()} {...itemProps.category}>
        {categories?.map((category) => (
          <Form.Dropdown.Item key={category.id} value={category.id.toString()} title={category.title} />
        ))}
      </Form.Dropdown>
    </Form>
  );
};
