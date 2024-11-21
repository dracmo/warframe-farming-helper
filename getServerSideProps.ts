import { getServerSession } from "next-auth/next";
import { authOptions } from "./lib/auth";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";

interface Redirect {
  destination: string;
  permanent: boolean;
}

interface Props {
  session: Session;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    const redirect: Redirect = {
      destination: "/",
      permanent: false,
    };
    return {
      redirect,
    };
  }

  const props: Props = {
    session,
  };

  return {
    props,
  };
}
